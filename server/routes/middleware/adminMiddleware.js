const jwt = require('jsonwebtoken');

const adminMiddleware = async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) return res.json({ success: false, error: { message: "Access denied. Invalid request." } });

  try {
    const verified = jwt.verify(token, process.env.APP_TOKEN);
    if (verified.userLevel !== 1) {
      return res.json({ success: false, error: { message: "You don't have permission to make this request." } })
    }
    req.user = verified;
    next();
  } catch (err) {
    return res.json({ success: false, error: { message: "You don't have permission to make this request." } });
  }
}

module.exports = adminMiddleware;