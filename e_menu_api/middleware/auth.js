const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token)
    return res.status(401).send({ error: 'Access denied. No token provided' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = payload;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token' });
  }
};
