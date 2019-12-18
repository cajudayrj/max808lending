const queryCallback = require('../connection/queryCallback');

const addNew = async (con, data, id) => {
  const query = `
  INSERT INTO LoanPayments
  (
    loan_id,
    firstPaymentDate, firstPaymentAmount, firstPaymentBalance, firstPaymentPenalty, firstPaymentPaid, firstPaymentStatus,
    secondPaymentDate, secondPaymentAmount, secondPaymentBalance, secondPaymentPenalty, secondPaymentPaid, secondPaymentStatus,
    thirdPaymentDate, thirdPaymentAmount, thirdPaymentBalance, thirdPaymentPenalty, thirdPaymentPaid, thirdPaymentStatus,
    fourthPaymentDate, fourthPaymentAmount, fourthPaymentBalance, fourthPaymentPenalty, fourthPaymentPaid, fourthPaymentStatus,
    fifthPaymentDate, fifthPaymentAmount, fifthPaymentBalance, fifthPaymentPenalty, fifthPaymentPaid, fifthPaymentStatus,
    sixthPaymentDate, sixthPaymentAmount, sixthPaymentBalance, sixthPaymentPenalty, sixthPaymentPaid, sixthPaymentStatus,
    seventhPaymentDate, seventhPaymentAmount, seventhPaymentBalance, seventhPaymentPenalty, seventhPaymentPaid, seventhPaymentStatus,
    eighthPaymentDate, eighthPaymentAmount, eighthPaymentBalance, eighthPaymentPenalty, eighthPaymentPaid, eighthPaymentStatus,
    ninthPaymentDate, ninthPaymentAmount, ninthPaymentBalance, ninthPaymentPenalty, ninthPaymentPaid, ninthPaymentStatus,
    tenthPaymentDate, tenthPaymentAmount, tenthPaymentBalance, tenthPaymentPenalty, tenthPaymentPaid, tenthPaymentStatus,
    eleventhPaymentDate, eleventhPaymentAmount, eleventhPaymentBalance, eleventhPaymentPenalty, eleventhPaymentPaid, eleventhPaymentStatus,
    twelfthPaymentDate, twelfthPaymentAmount, twelfthPaymentBalance, twelfthPaymentPenalty, twelfthPaymentPaid, twelfthPaymentStatus
  )
  VALUES
  (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
  const variables = [
    id,
    data.firstDate, data.firstAmount, data.firstAmount, 0, 0, 'Unpaid',
    data.secondDate, data.secondAmount, data.secondAmount, 0, 0, 'Unpaid',
    data.thirdDate, data.thirdAmount, data.thirdAmount, 0, 0, 'Unpaid',
    data.fourthDate, data.fourthAmount, data.fourthAmount, 0, 0, 'Unpaid',
    data.fifthDate, data.fifthAmount, data.fifthAmount, 0, 0, 'Unpaid',
    data.sixthDate, data.sixthAmount, data.sixthAmount, 0, 0, 'Unpaid',
    data.seventhDate, data.seventhAmount, data.seventhAmount, 0, 0, 'Unpaid',
    data.eighthDate, data.eighthAmount, data.eighthAmount, 0, 0, 'Unpaid',
    data.ninthDate, data.ninthAmount, data.ninthAmount, 0, 0, 'Unpaid',
    data.tenthDate, data.tenthAmount, data.tenthAmount, 0, 0, 'Unpaid',
    data.eleventhDate, data.eleventhAmount, data.eleventhAmount, 0, 0, 'Unpaid',
    data.twelfthDate, data.twelfthAmount, data.twelfthAmount, 0, 0, 'Unpaid',
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

const get = async (con, id) => {
  const query = `SELECT * FROM LoanPayments WHERE loan_id = ?`;

  const [rows] = await con.execute(query, [id], queryCallback);

  return rows;
}

const updatePayments = async (con, id, data) => {
  const query = `
  UPDATE LoanPayments SET
  firstPaymentDate = ?, firstPaymentBalance = ?, firstPaymentPaid = ?, firstPaymentPenalty = ?, firstPaymentStatus = ?,
  secondPaymentDate = ?, secondPaymentBalance = ?, secondPaymentPaid = ?, secondPaymentPenalty = ?, secondPaymentStatus = ?,
  thirdPaymentDate = ?, thirdPaymentBalance = ?, thirdPaymentPaid = ?, thirdPaymentPenalty = ?, thirdPaymentStatus = ?,
  fourthPaymentDate = ?, fourthPaymentBalance = ?, fourthPaymentPaid = ?, fourthPaymentPenalty = ?, fourthPaymentStatus = ?,
  fifthPaymentDate = ?, fifthPaymentBalance = ?, fifthPaymentPaid = ?, fifthPaymentPenalty = ?, fifthPaymentStatus = ?,
  sixthPaymentDate = ?, sixthPaymentBalance = ?, sixthPaymentPaid = ?, sixthPaymentPenalty = ?, sixthPaymentStatus = ?,
  seventhPaymentDate = ?, seventhPaymentBalance = ?, seventhPaymentPaid = ?, seventhPaymentPenalty = ?, seventhPaymentStatus = ?,
  eighthPaymentDate = ?, eighthPaymentBalance = ?, eighthPaymentPaid = ?, eighthPaymentPenalty = ?, eighthPaymentStatus = ?,
  ninthPaymentDate = ?, ninthPaymentBalance = ?, ninthPaymentPaid = ?, ninthPaymentPenalty = ?, ninthPaymentStatus = ?,
  tenthPaymentDate = ?, tenthPaymentBalance = ?, tenthPaymentPaid = ?, tenthPaymentPenalty = ?, tenthPaymentStatus = ?,
  eleventhPaymentDate = ?, eleventhPaymentBalance = ?, eleventhPaymentPaid = ?, eleventhPaymentPenalty = ?, eleventhPaymentStatus = ?,
  twelfthPaymentDate = ?, twelfthPaymentBalance = ?, twelfthPaymentPaid = ?, twelfthPaymentPenalty = ?, twelfthPaymentStatus = ?
  WHERE loan_id = ?
  `;
  const variables = [
    data.firstDate, data.firstBalance, data.firstPaid, data.firstPenalty, data.firstStatus,
    data.secondDate, data.secondBalance, data.secondPaid, data.secondPenalty, data.secondStatus,
    data.thirdDate, data.thirdBalance, data.thirdPaid, data.thirdPenalty, data.thirdStatus,
    data.fourthDate, data.fourthBalance, data.fourthPaid, data.fourthPenalty, data.fourthStatus,
    data.fifthDate, data.fifthBalance, data.fifthPaid, data.fifthPenalty, data.fifthStatus,
    data.sixthDate, data.sixthBalance, data.sixthPaid, data.sixthPenalty, data.sixthStatus,
    data.seventhDate, data.seventhBalance, data.seventhPaid, data.seventhPenalty, data.seventhStatus,
    data.eighthDate, data.eighthBalance, data.eighthPaid, data.eighthPenalty, data.eighthStatus,
    data.ninthDate, data.ninthBalance, data.ninthPaid, data.ninthPenalty, data.ninthStatus,
    data.tenthDate, data.tenthBalance, data.tenthPaid, data.tenthPenalty, data.tenthStatus,
    data.eleventhDate, data.eleventhBalance, data.eleventhPaid, data.eleventhPenalty, data.eleventhStatus,
    data.twelfthDate, data.twelfthBalance, data.twelfthPaid, data.twelfthPenalty, data.twelfthStatus,
    id,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

module.exports = {
  addNew,
  get,
  updatePayments,
}