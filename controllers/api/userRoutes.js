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

    // req.session.save(() => {
    //   req.session.userId = newUser.id;
    //   req.session.loggedIn = true;
    // });
  } catch (error) {
    res.status(500).json({
      message: 'Server ran into issue signing you up, please try again',
    });
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

/* router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validatePassword = await userData.checkPassword(req.body.password);
    if (!validatePassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: userData, message: 'You are now logged in!' });
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server ran into issue logging you in, please try again',
    });
  }
}); */

// Logout user
router.post('/logout', (req, res) => {
  req.logout();
  res.end();

  // req.session.destroy(() => {
  //   res.status(204).end();
  // });
});

module.exports = router;
