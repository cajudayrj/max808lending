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
    `SELECT COUNT(l.id) as loanCount FROM Loans l, Users u WHERE l.loanStatus LIKE '${status}%' AND l.user_id = u.id AND u.accountStatus = 'active'`
    : `SELECT COUNT(l.id) as loanCount FROM Loans l, Users u WHERE l.user_id = u.id AND u.accountStatus = 'active'`;

  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const rejectedCount = async (con) => {
  const query =
    `SELECT COUNT(id) as loanCount FROM Loans WHERE (loanStatus = ? OR loanStatus = ?)`

  const [rows] = await con.execute(query, ['Rejected', 'Refused'], queryCallback);
  return rows;
}

const all = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.user_id = u.id
    AND u.accountStatus = 'active'
    ORDER BY l.id
    DESC;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const pendingLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Pending'
    AND l.user_id = u.id
    AND u.accountStatus = 'active'
    ORDER BY l.id
    DESC;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const activeLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Active'
    AND l.user_id = u.id
    ORDER BY l.id
    DESC;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const acceptedLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Accepted'
    AND l.user_id = u.id
    ORDER BY l.id
    DESC;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const approvedLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Approved'
    AND l.user_id = u.id
    ORDER BY l.id
    DESC;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const fullyPaidLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.loanPaid, l.penaltyCharge, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Fully Paid'
    AND l.user_id = u.id
    ORDER BY l.id
    DESC;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const rejectedLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE (l.loanStatus = 'Rejected' OR l.loanStatus = 'Refused')
    AND l.user_id = u.id
    ORDER BY l.id
    DESC;
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
    loanBalance = ?
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
    data.amount,
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
  acceptedLoans,
  rejectedLoans,
  approveRequest,
  rejectRequest,
  setToActive,
  updatePaidPenaltyBalance,
  updatePaidPenaltyBalanceStatus,
  acceptRefuse,
}