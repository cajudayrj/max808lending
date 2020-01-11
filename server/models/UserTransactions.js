const queryCallback = require('../connection/queryCallback');

const all = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `SELECT 
    ut.*, u.firstName, u.lastName, u.middleName,
    (SELECT COUNT(id) FROM UserTransactions) AS fullCount 
    FROM UserTransactions ut, Users u 
    WHERE ut.user_id = u.id
    AND ut.amount > 0
    ORDER BY ut.id DESC
    LIMIT 20
    OFFSET ${offset}`;
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

const getUserTransactions = async (con, id, page) => {
  const offset = (page - 1) * 20;
  const query = `
    SELECT *,
    (
      SELECT COUNT(id)
      FROM UserTransactions
      WHERE user_id = ? 
      AND amount > 0
    ) AS fullCount 
    FROM UserTransactions 
    WHERE user_id = ? 
    AND amount > 0 ORDER BY id DESC 
    LIMIT 20 
    OFFSET ${offset}`;
  const [rows] = await con.execute(query, [id, id], queryCallback);
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