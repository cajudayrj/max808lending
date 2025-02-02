const queryCallback = require('../connection/queryCallback');
const moment = require('moment-timezone');

const get = async (con, id, userid) => {
  const query = `
  SELECT * FROM Loans WHERE id = ? AND user_id = ?
  ORDER BY id DESC
  LIMIT 1
  `;
  const variables = [id, userid];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const addNew = async (con, data) => {
  const query = `INSERT INTO Loans (id, user_id, amount, terms, loanDate, loanStatus) VALUES (?,?,?,?,?,?)`;
  const variables = [data.id, data.userId, data.loanAmount, data.loanTerms, data.loanDate, data.loanStatus];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const getAllData = async (con, id) => {
  const query = `
    SELECT
    u.firstName, u.lastName, u.address, u.town, u.cityProvince, u.mobileNum,
    u.email, u.birthday, u.gender, u.maritalStatus,
    l.*
    FROM Loans l, Users u
    WHERE l.id = ?
    AND l.user_id = u.id
  `
  const variables = [id]

  const [rows] = await con.execute(query, variables, queryCallback);

  return [rows];
}

const getLatest = async (con, id) => {
  const query = `
  SELECT * FROM Loans WHERE user_id = ?
  ORDER BY id DESC
  LIMIT 1
  `;
  const variables = [id];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const loanCount = async (con, status) => {
  const query = (status !== 'all') ?
    `SELECT COUNT(l.id) as loanCount FROM Loans l, Users u WHERE l.loanStatus LIKE '${status}%' AND l.user_id = u.id AND u.accountStatus = 'active' AND u.banned = '0'`
    : `SELECT COUNT(l.id) as loanCount FROM Loans l, Users u WHERE l.user_id = u.id AND u.accountStatus = 'active' AND u.banned = '0'`;

  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const rejectedCount = async (con) => {
  const query =

    `SELECT COUNT(id) as loanCount FROM Loans WHERE (loanStatus = ? OR loanStatus = ?) AND loanDate >= NOW()- interval 3 month`

  const [rows] = await con.execute(query, ['Rejected', 'Refused'], queryCallback);
  return rows;
}

const all = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
  SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus,
  (SELECT COUNT(l.id) FROM Loans l, Users u WHERE l.user_id = u.id
  AND u.accountStatus = 'active' AND u.banned = '0'
  AND l.id NOT IN (
    SELECT DISTINCT(ll.id) FROM Loans ll, Users uu 
    WHERE (ll.loanStatus = 'Rejected' OR ll.loanStatus = 'Refused' OR ll.loanStatus = 'Fully Paid')
    AND ll.user_id = uu.id
    AND ll.loanDate <= NOW()- interval 3 month
  )
  ) AS fullCount
  FROM Loans l, Users u 
  WHERE l.user_id = u.id
  AND u.accountStatus = 'active'
  AND u.banned = '0'
  AND l.id NOT IN (
    SELECT DISTINCT(ll.id)      FROM Loans ll, Users uu 
    WHERE (ll.loanStatus = 'Rejected' OR ll.loanStatus = 'Refused' OR ll.loanStatus = 'Fully Paid')
    AND ll.user_id = uu.id
    AND ll.loanDate <= NOW()- interval 3 month
  )
    ORDER BY l.id
    DESC
    LIMIT 20
    OFFSET ${offset};
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const allCount = async (con) => {
  const query = `
  SELECT DISTINCT(l.id), CONCAT(u.firstName, ' ', u.lastName) AS fullName, l.amount, l.terms, l.loanDate, l.loanStatus,
  (SELECT COUNT(l.id) FROM Loans l, Users u WHERE l.user_id = u.id
  AND u.accountStatus = 'active' AND u.banned = '0'
  AND l.id NOT IN (
    SELECT DISTINCT(ll.id) FROM Loans ll, Users uu 
    WHERE (ll.loanStatus = 'Rejected' OR ll.loanStatus = 'Refused' OR ll.loanStatus = 'Fully Paid')
    AND ll.user_id = uu.id
    AND ll.loanDate <= NOW()- interval 3 month
  )
  ) AS fullCount
  FROM Loans l, Users u 
  WHERE l.user_id = u.id
  AND u.accountStatus = 'active'
  AND u.banned = '0'
  AND l.id NOT IN (
    SELECT DISTINCT(ll.id)      FROM Loans ll, Users uu 
    WHERE (ll.loanStatus = 'Rejected' OR ll.loanStatus = 'Refused' OR ll.loanStatus = 'Fully Paid')
    AND ll.user_id = uu.id
    AND ll.loanDate <= NOW()- interval 3 month
  )
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const pendingLoans = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus,
    (
      SELECT COUNT(l.id)
      FROM Loans l, Users u 
      WHERE l.loanStatus = 'Pending'
      AND l.user_id = u.id
      AND u.accountStatus = 'active'
    ) AS fullCount
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Pending'
    AND l.user_id = u.id
    AND u.accountStatus = 'active'
    AND u.banned = '0'
    ORDER BY l.id
    DESC
    LIMIT 20
    OFFSET ${offset};
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const activeLoans = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanBalance, l.loanDate, l.loanStatus, l.dueDate,
    (SELECT COUNT(l.id) FROM Loans l, Users u 
    WHERE l.loanStatus = 'Active'
    AND l.user_id = u.id) AS fullCount 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Active'
    AND l.user_id = u.id
    AND u.banned = '0'
    ORDER BY l.id
    DESC
    LIMIT 20
    OFFSET ${offset};
  `;

  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const acceptedLoans = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus,
    (
      SELECT COUNT(l.id)
      FROM Loans l, Users u 
      WHERE l.loanStatus = 'Accepted'
      AND l.user_id = u.id
    ) AS fullCount
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Accepted'
    AND l.user_id = u.id
    AND u.banned = '0'
    ORDER BY l.id
    DESC
    LIMIT 20
    OFFSET ${offset};
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const approvedLoans = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus,
    (
      SELECT COUNT(l.id) FROM Loans l, Users u 
      WHERE l.loanStatus = 'Approved'
      AND l.user_id = u.id
    ) AS fullCount
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Approved'
    AND l.user_id = u.id
    AND u.banned = '0'
    ORDER BY l.id
    DESC
    LIMIT 20
    OFFSET ${offset};
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const fullyPaidLoans = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
    SELECT DISTINCT(loan.id) as loan_id, fp.transactionDate, loan.*, u.firstName, u.lastName
    FROM Loans loan,
    (
      SELECT ut.loan_id, MAX(ut.transactionDate) as transactionDate, l.id, l.loanStatus FROM UserTransactions ut,
        (SELECT l.id, l.loanStatus FROM Loans l WHERE l.loanStatus = 'Fully Paid') l
      WHERE ut.loan_id = l.id
      AND ut.transactionDate >= NOW()- interval 3 month
      GROUP BY ut.loan_id
    ) fp,
    Users u
    WHERE loan.id = fp.loan_id AND loan.user_id = u.id
    ORDER BY fp.transactionDate
    DESC
    LIMIT 20
    OFFSET ${offset};
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const fullyPaidLoansCount = async (con) => {
  const query = `
    SELECT DISTINCT(loan.id) as loan_id, fp.transactionDate, loan.*, CONCAT(u.firstName, ' ', u.lastName) AS fullName
    FROM Loans loan,
    (
      SELECT ut.loan_id, MAX(ut.transactionDate) as transactionDate, l.id, l.loanStatus FROM UserTransactions ut,
        (SELECT l.id, l.loanStatus FROM Loans l WHERE l.loanStatus = 'Fully Paid') l
      WHERE ut.loan_id = l.id
      AND ut.transactionDate >= NOW()- interval 3 month
      GROUP BY ut.loan_id
    ) fp,
    Users u
    WHERE loan.id = fp.loan_id AND loan.user_id = u.id
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const rejectedLoans = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus,
    (
      SELECT COUNT(l.id)
      FROM Loans l, Users u 
      WHERE (l.loanStatus = 'Rejected' OR l.loanStatus = 'Refused')
      AND l.user_id = u.id
      AND l.loanDate >= NOW()- interval 3 month
    ) AS fullCount
    FROM Loans l, Users u 
    WHERE (l.loanStatus = 'Rejected' OR l.loanStatus = 'Refused')
    AND l.user_id = u.id
    AND l.loanDate >= NOW()- interval 3 month
    ORDER BY l.id
    DESC
    LIMIT 20
    OFFSET ${offset};
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const approveRequest = async (con, data, id) => {
  const query = `
    UPDATE Loans SET
    amount = ?,
    terms = ?,
    financeCharge = ?,
    processingFee = ?,
    serviceFee = ?,
    loanProceeds = ?,
    approvedDate = ?,
    dueDate = ?,
    loanStatus = ?,
    loanBalance = ?,
    loanType = ?
    WHERE id = ?
  `;
  const variables = [
    data.amount,
    data.terms,
    data.financeCharge,
    2,
    data.serviceFee,
    data.loanProceeds,
    data.approvedDate,
    data.dueDate,
    'Approved',
    data.loanBalance,
    data.loanType,
    id
  ];

  const [rows] = await con.execute(query, variables, queryCallback);

  return rows;
}

const rejectRequest = async (con, id) => {
  const query = `
    UPDATE Loans SET
    loanStatus = ?
    WHERE id = ?
  `;

  const [rows] = await con.execute(query, ['Rejected', id], queryCallback);

  return rows;
}

const setToActive = async (con, id) => {
  const query = `
    UPDATE Loans SET
    loanStatus = ?,
    acceptedDate = ?
    WHERE id = ?
  `;

  const today = moment().tz('Asia/Manila').format('YYYY-MM-DD');
  const [rows] = await con.execute(query, ['Active', today, id], queryCallback);

  return rows;
}

const updatePaidPenaltyBalance = async (con, id, data) => {
  const query = `
    UPDATE Loans SET
    loanBalance = ?,
    penaltyCharge = ?,
    loanPaid = ?
    WHERE id = ?
  `;
  const [rows] = await con.execute(query, [data.totalBalance, data.totalPenalty, data.totalPaid, id], queryCallback);

  return rows;
}

const updatePaidPenaltyBalanceStatus = async (con, id, data, status) => {
  const query = `
    UPDATE Loans SET
    loanBalance = ?,
    penaltyCharge = ?,
    loanPaid = ?,
    loanStatus = ?
    WHERE id = ?
  `;
  const [rows] = await con.execute(query, [data.totalBalance, data.totalPenalty, data.totalPaid, status, id], queryCallback);

  return rows;
}

const acceptRefuse = async (con, id, action, date) => {
  const query = `
    UPDATE Loans SET
    loanStatus = ?,
    acceptedDate = ?
    WHERE id = ?
  `;

  const [rows] = await con.execute(query, [action, date, id], queryCallback);

  return rows;
}

const userTransactions = async (con, id) => {
  const query = `SELECT * FROM Loans WHERE (loanStatus = "Active" OR loanStatus = "Fully Paid") AND loanPaid > 0 AND user_id = ? ORDER BY id DESC`;

  const [rows] = await con.execute(query, [id], queryCallback);

  return rows;
}

const allTransactions = async (con) => {
  const query = `SELECT 
    l.id, l.acceptedDate, l.loanPaid, 
    u.firstName, u.middleName, u.lastName 
    FROM Loans l, Users u 
    WHERE (loanStatus = "Active" OR loanStatus = "Fully Paid") 
    AND l.loanPaid > 0
    AND l.user_id = u.id ORDER BY id DESC
    `;

  const [rows] = await con.execute(query, [], queryCallback);

  return rows;
}

const setBackToActive = async (con, id) => {
  const query = `UPDATE Loans SET loanStatus = "Active" WHERE id = ?`;

  const [rows] = await con.execute(query, [id], queryCallback);

  return rows;
}

const getTransactions = async (con, id) => {
  const query = `SELECT * FROM UserTransactions WHERE loan_id = ? AND amount > 0 ORDER BY id DESC`;
  const [rows] = await con.execute(query, [id], queryCallback);
  return rows;
}

const generateActiveLoans = async con => {
  const query = `
    SELECT l.id AS loanId, CONCAT(u.firstName, ' ', u.lastName) as fullName, l.amount,
    l.loanBalance, l.terms, DATE_FORMAT(l.loanDate, '%d-%M-%Y') as loanDate,
    DATE_FORMAT(l.dueDate, '%d-%M-%Y') as dueDate, l.loanStatus, lp.* 
    FROM LoanPayments lp
    INNER JOIN Loans l ON
    lp.loan_id = l.id
    INNER JOIN Users u ON
    l.user_id = u.id
    WHERE l.loanStatus = 'Active';
  `

  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const updateDueDate = async (con, id, date) => {
  const query = `
    UPDATE Loans SET
    dueDate = ?
    WHERE id = ?
  `;
  const [rows] = await con.execute(query, [date, id], queryCallback);

  return rows;
}

module.exports = {
  get,
  addNew,
  getAllData,
  getLatest,
  loanCount,
  rejectedCount,
  all,
  pendingLoans,
  activeLoans,
  approvedLoans,
  fullyPaidLoans,
  fullyPaidLoansCount,
  acceptedLoans,
  rejectedLoans,
  approveRequest,
  rejectRequest,
  setToActive,
  updatePaidPenaltyBalance,
  updatePaidPenaltyBalanceStatus,
  acceptRefuse,
  userTransactions,
  allTransactions,
  setBackToActive,
  getTransactions,
  generateActiveLoans,
  updateDueDate,
  allCount,
}