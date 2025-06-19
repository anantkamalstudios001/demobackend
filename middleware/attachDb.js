const { getDbConnection } = require('../config/db');

const attachDb = (req, res, next) => {
  const collegeName = req.headers['x-college-name'];

  if (!collegeName) {
    return res.status(400).json({ status: false, message: 'Missing x-college-name header' });
  }

  req.db = getDbConnection(collegeName.toLowerCase());
  next();
};

module.exports = attachDb;
