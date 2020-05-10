const queryCallback = require('../connection/queryCallback');

const all = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
      SELECT trans.*, us.firstName, us.lastName FROM UserTransactions trans, Users us,
      (
        SELECT DISTINCT(loan.id) as loan_id, fp.transactionDate, loan.*, u.firstName, u.lastName
        FROM Loans loan,
        (
          SELECT ut.loan_id, MAX(ut.transactionDate) as transactionDate, l.id, l.loanStatus FROM UserTransactions ut,
            Loans l
          WHERE ut.loan_id = l.id
          AND ut.transactionDate >= NOW()- interval 3 month
          GROUP BY ut.loan_id
        ) fp,
        Users u
        WHERE loan.id = fp.loan_id AND loan.user_id = u.id
      ) ld
      WHERE ld.loan_id = trans.loan_id
      AND us.id = trans.user_id
      AND trans.transactionDate >= NOW()- interval 3 month
      ORDER BY trans.id DESC
      LIMIT 20
      OFFSET ${offset}
    `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const allCount = async (con) => {
  const query = `
    SELECT trans.*, CONCAT(us.firstName, ' ', us.lastName) as fullName FROM UserTransactions trans, Users us,
    (
      SELECT DISTINCT(loan.id) as loan_id, fp.transactionDate, loan.*, u.firstName, u.lastName
      FROM Loans loan,
      (
        SELECT ut.loan_id, MAX(ut.transactionDate) as transactionDate, l.id, l.loanStatus FROM UserTransactions ut,
          Loans l
        WHERE ut.loan_id = l.id
        AND ut.transactionDate >= NOW()- interval 3 month
        GROUP BY ut.loan_id
      ) fp,
      Users u
      WHERE loan.id = fp.loan_id AND loan.user_id = u.id
    ) ld
    WHERE ld.loan_id = trans.loan_id
    AND us.id = trans.user_id
    AND trans.transactionDate >= NOW()- interval 3 month
    ORDER BY trans.transactionDate DESC
    `;
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
  allCount,
  add,
  getUserTransactions,
  editByLoanId,
};