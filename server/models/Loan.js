const queryCallback = require('../connection/queryCallback');

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
    `SELECT COUNT(id) as loanCount FROM Loans WHERE loanStatus LIKE '${status}%'`
    : `SELECT COUNT(id) as loanCount FROM Loans`;

  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const pendingLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Pending'
    AND l.user_id = u.id;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const activeLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Active'
    AND l.user_id = u.id;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const acceptedLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Accepted'
    AND l.user_id = u.id;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const approvedLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Approved'
    AND l.user_id = u.id;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const rejectedLoans = async (con) => {
  const query = `
    SELECT DISTINCT(l.id), u.firstName, u.lastName, l.amount, l.terms, l.loanDate, l.loanStatus 
    FROM Loans l, Users u 
    WHERE l.loanStatus = 'Rejected'
    AND l.user_id = u.id;
  `;
  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

module.exports = {
  addNew,
  getAllData,
  getLatest,
  loanCount,
  pendingLoans,
  activeLoans,
  approvedLoans,
  acceptedLoans,
  rejectedLoans,
}