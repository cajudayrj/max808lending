const queryCallback = require('../connection/queryCallback');

const post = async (con, data) => {
  const query = `
  INSERT INTO UserInformation
  (user_id, officeName, officeAddress, officeTelephone, officePosition, dateOfPayout, officePayrollAccount, bankCheckingAccount, existingLoan, fbLink) 
  VALUES 
  (?, ?, ?, ?, ?, ?, ? ,?, ?, ?)
  `;

  const variables = [
    data.userId,
    data.officeName,
    data.officeAddress,
    data.officeTelephone,
    data.officePosition,
    data.dateOfPayout,
    data.officePayrollAccount,
    data.bankCheckingAccount,
    data.existingLoan,
    data.fbLink,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const update = async (con, id, data) => {
  const query = `
    UPDATE UserInformation SET
    officeName = ?, officeAddress = ?, officeTelephone = ?, officePosition = ?,
    dateOfPayout = ?, officePayrollAccount = ?, bankCheckingAccount = ?,
    existingLoan = ?, fbLink = ?
    WHERE user_id = ?
  `

  const variables = [
    data.officeName,
    data.officeAddress,
    data.officeTelephone,
    data.officePosition,
    data.dateOfPayout,
    data.officePayrollAccount,
    data.bankCheckingAccount,
    data.existingLoan,
    data.fbLink,
    id
  ]

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

module.exports = {
  post,
  update
};