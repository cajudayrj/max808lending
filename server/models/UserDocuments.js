const queryCallback = require('../connection/queryCallback');

const uploadDocs = async (con, data) => {
  const query = `
  INSERT INTO UserDocuments 
  (user_id, validIdOne, validIdTwo, payslipOne, payslipTwo, coe, billingStatement, bankTransaction, companyId) 
  VALUES 
  (?, ?, ?, ?, ?, ?, ? ,?, ?)
  `;

  const variables = [
    data.userId,
    data.validIdOne,
    data.validIdTwo,
    data.payslipOne,
    data.payslipTwo,
    data.coe,
    data.billingStatement,
    data.bankTransaction,
    data.companyId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const uploadCompanyId = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET companyId = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.companyId,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const updatePayslipOne = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET payslipOne = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.payslipOne,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const updatePayslipTwo = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET payslipTwo = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.payslipTwo,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const updateValidIdOne = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET validIdOne = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.validIdOne,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const updateValidIdTwo = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET validIdTwo = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.validIdTwo,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const updateCoe = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET coe = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.coe,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const updateBillingStatement = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET billingStatement = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.billingStatement,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const updateBankTransaction = async (con, data) => {
  const query = `
  UPDATE UserDocuments 
  SET bankTransaction = ?
  WHERE user_id = ?
  `;

  const variables = [
    data.bankTransaction,
    data.userId,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

module.exports = {
  uploadDocs,
  uploadCompanyId,
  updateValidIdOne,
  updateValidIdTwo,
  updatePayslipOne,
  updatePayslipTwo,
  updateCoe,
  updateBankTransaction,
  updateBillingStatement,
};