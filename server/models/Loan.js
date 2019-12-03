const queryCallback = require('../connection/queryCallback');

const addNew = async (con, data) => {
  const query = `INSERT INTO Loans (user_id, amount, terms) VALUES (?,?,?)`;
  const variables = [data.userId, data.loanAmount, data.loanTerms];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

module.exports = {
  addNew
}