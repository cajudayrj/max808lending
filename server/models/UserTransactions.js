const queryCallback = require('../connection/queryCallback');

const all = async (con) => {
  const query = `SELECT 
    ut.*, u.firstName, u.lastName, u.middleName 
    FROM UserTransactions ut, Users u 
    WHERE ut.user_id = u.id
    AND ut.amount > 0
    ORDER BY ut.id DESC`;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const add = async (con, data) => {
  const query = `
  INSERT INTO UserTransactions
  (loan_id, user_id, description, amount, transactionDate) 
  VALUES 
  (?, ?, ?, ?, ?)
  `;

  const variables = [
    data.loan_id,
    data.user_id,
    data.description,
    data.amount,
    data.transactionDate
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const getUserTransactions = async (con, id) => {
  const query = `SELECT * FROM UserTransactions WHERE user_id = ? AND amount > 0 ORDER BY id DESC`;
  const [rows] = await con.execute(query, [id], queryCallback);
  return rows;
}

const editByLoanId = async (con, id, data) => {
  const query = `UPDATE UserTransactions SET description = ?, amount = ?, transactionDate = ? WHERE id = ?`;
  const [rows] = await con.execute(query, [data.description, data.amount, data.transactionDate, id]);
  return rows;
}

module.exports = {
  all,
  add,
  getUserTransactions,
  editByLoanId,
};