const queryCallback = require('../connection/queryCallback');

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
  const [rows] = await con.execute(`SELECT COUNT(id) as userCount FROM Users`, [], queryCallback);
  return rows;
}

const getInfo = async (con, id) => {
  const query = `
    SELECT u.*, 
    ui.officeName, ui.officeAddress, ui.officePosition, ui.officeTelephone,
    ui.dateOfPayout, ui.officePayrollAccount, ui.bankCheckingAccount, ui.existingLoan
    FROM Users u, UserInformation ui WHERE u.id = ui.user_id AND u.id = ?`;

  const [rows] = await con.execute(query, [id], queryCallback);
  return rows;
}

module.exports = {
  find,
  findEmail,
  findUsername,
  register,
  verify,
  setAccountStatus,
  updatePersonalDetails,
  userCount,
  getInfo,
};