const queryCallback = require('../connection/queryCallback');

const all = async (con, page) => {
  const offset = (page - 1) * 20;
  const query = `SELECT DISTINCT(u.id), 
  u.username, u.firstName, u.middleName, u.lastName, u.email, u.mobileNum,
  ul.level,
  (
    SELECT COUNT(u.id)
    FROM Users u, UserLevels ul
    WHERE u.userLevel = ul.id
    AND u.accountStatus = "active"
  ) as fullCount
  FROM Users u, UserLevels ul WHERE u.userLevel = ul.id AND u.accountStatus = "active"
  LIMIT 20
  OFFSET ${offset}
  `

  const [rows] = await con.execute(query, [], queryCallback);
  return rows;
}

const find = async (con, id) => {
  const [rows] = await con.execute(`SELECT * FROM Users where id = ?`, [id], queryCallback);
  return rows;
}

const findEmail = async (con, email) => {
  const [rows] = await con.execute(`SELECT * FROM Users where email = ?`, [email], queryCallback);
  return rows;
}

const findUsername = async (con, username) => {
  const [rows] = await con.execute(`SELECT * FROM Users where username = ?`, [username], queryCallback);
  return rows;
}

const register = async (con, data) => {
  const { id, email, username, password, userLevel, accountStatus, accountVerificationToken } = data;
  const query = `INSERT INTO Users (id, email, username, password, userLevel, accountStatus, accountVerificationToken) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const variables = [id, email, username, password, userLevel, accountStatus, accountVerificationToken];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const verify = async (con, token) => {
  const [rows] = await con.execute(`SELECT * FROM Users where accountVerificationToken = ?`, [token], queryCallback);
  return rows;
}

const setAccountStatus = async (con, id, status) => {
  const query = `UPDATE Users SET accountStatus = ? WHERE id = ?`;
  const [rows] = await con.execute(query, [status, id], queryCallback);
  return rows;
}

const updatePersonalDetails = async (con, id, data) => {
  const query = `
  UPDATE Users SET 
  firstName = ?, middleName = ?, lastName = ?,
  mobileNum = ?, gender = ?, birthday = ?,
  address = ?, town = ?, cityProvince = ?,
  maritalStatus = ?, accountStatus = ?
  WHERE id = ?
  `
  const variables = [
    data.fname,
    data.mname,
    data.lname,
    data.mobileNum,
    data.gender,
    data.birthday,
    data.address,
    data.townMunicipality,
    data.cityProvince,
    data.maritalStatus,
    data.accountStatus,
    id
  ]

  const [rows] = await con.execute(query, variables, queryCallback);

  return rows;
}

const userCount = async (con) => {
  const [rows] = await con.execute(`SELECT COUNT(id) as userCount FROM Users WHERE accountStatus = "active"`, [], queryCallback);
  return rows;
}

const getInfo = async (con, id) => {
  const query = `
    SELECT u.*, 
    ui.officeName, ui.officeAddress, ui.officePosition, ui.officeTelephone,
    ui.dateOfPayout, ui.dateOfPayoutTwo, ui.officePayrollAccount, ui.bankCheckingAccount, ui.existingLoan, ui.fbLink
    FROM Users u, UserInformation ui WHERE u.id = ui.user_id AND u.id = ?`;

  const [rows] = await con.execute(query, [id], queryCallback);
  return rows;
}

const getReferences = async (con, id) => {
  const query = `
    SELECT u.*, 
    ur.officemateName, ur.officemateDepartment, ur.officematePosition, ur.officemateMobileNum, ur.officemateEmail,
    ur.friendName, ur.friendMobileNum, ur.friendEmail,
    ur.familyName, ur.familyMobileNum, ur.familyEmail
    FROM Users u, UserReferences ur WHERE u.id = ur.user_id AND u.id = ?`;

  const [rows] = await con.execute(query, [id], queryCallback);
  return rows;
}

const getDocuments = async (con, id) => {
  const query = `
    SELECT u.*, 
    ud.payslipOne, ud.payslipTwo, ud.validIdOne, ud.validIdTwo,
    ud.coe, ud.billingStatement, ud.bankTransaction, ud.companyId
    FROM Users u, UserDocuments ud WHERE u.id = ud.user_id AND u.id = ?`;

  const [rows] = await con.execute(query, [id], queryCallback);
  return rows;
}

const updateUser = async (con, id, data) => {
  const query = `
  UPDATE Users SET
  mobileNum = ?, address = ?, town = ?, cityProvince = ?,
  maritalStatus = ?
  WHERE id = ?
  `
  const variables = [
    data.mobileNum,
    data.address,
    data.town,
    data.cityProvince,
    data.maritalStatus,
    id
  ]

  const [rows] = await con.execute(query, variables, queryCallback);

  return rows;
}

module.exports = {
  all,
  find,
  findEmail,
  findUsername,
  register,
  verify,
  setAccountStatus,
  updatePersonalDetails,
  userCount,
  getInfo,
  getReferences,
  getDocuments,
  updateUser,
};