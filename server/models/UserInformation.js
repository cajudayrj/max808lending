const queryCallback = require('../connection/queryCallback');

const post = async (con, data) => {
  const query = `
  INSERT INTO UserInformation
  (user_id, officeName, officeAddress, officeTelephone, officePosition, dateOfPayout, officePayrollAccount, bankCheckingAccount,existingLoan) 
  VALUES 
  (?, ?, ?, ?, ?, ?, ? ,?, ?)
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
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

module.exports = {
  post
};