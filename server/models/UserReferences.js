const queryCallback = require('../connection/queryCallback');

const post = async (con, userid, data) => {
  const query = `
  INSERT INTO UserReferences
  (
    user_id, officemateName, officemateDepartment, officematePosition, officemateMobileNum, officemateEmail,
    friendName, friendMobileNum, friendEmail,
    familyName, familyMobileNum, familyEmail
  ) 
  VALUES 
  (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?)
  `;

  const variables = [
    userid,
    data.officemateName,
    data.officemateDepartment,
    data.officematePosition,
    data.officemateMobileNum,
    data.officemateEmail,
    data.friendName,
    data.friendMobileNum,
    data.friendEmail,
    data.familyName,
    data.familyMobileNum,
    data.familyEmail,
  ];

  const [rows] = await con.execute(query, variables, queryCallback);
  return rows;
}

module.exports = {
  post
};