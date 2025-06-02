// middleware/departmentCheck.js
module.exports = function (req, res, next) {
  const department = req.headers['x-department'];

  if (!department) {
    return res.status(400).json({ message: 'Missing department in headers' });
  }

  req.department = department; // Attach to request for later use
  next();
};
