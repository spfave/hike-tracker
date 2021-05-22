const router = require('express').Router();
const { User } = require('../../models');

// Sign up new user
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(201).json(userData);
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server ran into issue signing you up, please try again',
    });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validatePassword = await userData.checkPassword(req.body.password);
    if (!validatePassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
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
});

// Logout user
router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
