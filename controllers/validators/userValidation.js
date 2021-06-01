const { body } = require('express-validator');

const validateNewUser = [
  body('email', 'Invalid email').isEmail().trim(),
  body('password', 'Password must be at least 8 characters').isLength({
    min: 8,
  }),
];

module.exports = { validateNewUser };
