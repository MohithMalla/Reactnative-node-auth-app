const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1]; // Expect "Bearer TOKEN"
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, "0e15cedd3970c0ceed9f24a00699d1a3898f835a8dd53ae895e1ad4afe72b6a026da76281873b8596962862f0e3d0ee7f66414206bb09dcd729d0f39f88ea2a2");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
