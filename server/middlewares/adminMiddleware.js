const asyncHandler = require('express-async-handler');

// Middleware to check if the user is an admin
const admin = asyncHandler((req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Not authorized as an admin');
  }
});

module.exports = { admin };
