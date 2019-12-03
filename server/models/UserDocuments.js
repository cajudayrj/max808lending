const queryCallback = require('../connection/queryCallback');

const uploadDocs = async (con, data) => {
  const query = `
  INSERT INTO UserDocuments 
  (user_id, validIdOne, validIdTwo, payslipOne, payslipTwo, coe, billingStatement, bankTransaction) 
  VALUES 
  (?, ?, ?, ?, ?, ?, ? ,?)
  `;

  const variables = [
    data.userId,
    data.validIdOne,
    data.validIdTwo,
    data.payslipOne,
    data.payslipTwo,
    data.coe,
    data.billingStatement,
    data.bankTransaction
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

module.exports = {
  uploadDocs
};