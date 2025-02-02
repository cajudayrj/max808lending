const jwt = require('jsonwebtoken');

const userMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.json({ success: false, error: { message: "Access denied. Invalid request." } });

  try {
    const verified = jwt.verify(token, process.env.APP_TOKEN);
    req.user = verified;
    next();
  } catch (err) {
    return res.json({ success: false, error: { message: "You don't have permission to make this request." } });
  }
}

module.exports = userMiddleware;