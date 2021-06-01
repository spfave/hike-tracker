const router = require('express').Router();
const { validationResult } = require('express-validator');
const { validateNewUser } = require('../validators/userValidation');
const passport = require('../passport/passportLocal');
const { User } = require('../../models');

// Sign up new user
router.post('/', validateNewUser, async (req, res) => {
  // Maintain user signup inputs if errors
  const signupForm = {
    username: req.body.username,
    email: req.body.email,
  };

  // Validate signup inputs
  const msgErrors = [];
  const validationErrors = validationResult(req).errors;

  if (validationErrors.length) {
    validationErrors.forEach((err) => msgErrors.push(err.msg));
    req.flash('errors', msgErrors);
    return res.render('login', { errors: req.flash('errors'), ...signupForm });
  }

  // Create new user object
  try {
    // Search user table for email to check if already used
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (userData) {
      req.flash(
        'errors',
        `Email ${req.body.email} already registered to a user`
      );
      return res.render('login', { errors: req.flash('errors') });
    }

    const newUser = await User.create(req.body);
    req.flash(
      'msg_success',
      `${req.body.username} thanks for signing up! Please log in to continue`
    );
    res.status(201).render('login', { msg_success: req.flash('msg_success') });
  } catch (error) {
    req.flash('errors', error);
    res
      .status(500)
      .render('login', { errors: req.flash('errors'), ...signupForm });
  }
});

// Login user
router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
  })
);

// Logout user
router.post('/logout', (req, res) => {
  req.logout();
  res.end();
});

module.exports = router;
