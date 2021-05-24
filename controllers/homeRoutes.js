const router = require('express').Router();
const { User, Trail, Hike, Comment } = require('../models');

// Application homepage - list of trails and login/signup form
router.get('/', async (req, res) => {
  try {
    const trailData = await Trail.findAll();
    const trails = trailData.map((trail) => trail.get({ plain: true }));

    res.render('homepage', { loggedIn: req.session.loggedIn }); //...trails,
    // res.json({...trails}) // TESTING
  } catch (error) {
    res.status(500).json(error);
  }
});

// Trail - create new trail
router.get('/trail/new', (req, res) => {
  // res.send('Test');
  res.render('newTrail');
});

// Trail - edit saved trail
router.get('/trail/edit/:id', async (req, res) => {
  res.send(req.params.id);
});

// Trail Details
router.get('/trail/:id', async (req, res) => {
  try {
    const trailData = await Trail.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: [{ model: User, attributes: ['name'] }],
        },
      ],
    });
    const trail = trailData.get({ plain: true });

    // res.render('trail', { ...trail, logged_in: req.session.loggedIn });
    res.json({ ...trail, logged_in: req.session.loggedIn }); // TESTING
  } catch (error) {
    res.status(500).json(error);
  }
});

// User Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    // const userData = await User.findByPk(req.session.userId, {
    //   attributes: { exclude: ['password'] },
    //   include: [{ model: Hike }],
    // });
    // const user = userData.get({ plain: true });

    res.render('dashboard'); //, { ...user, logged_in: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Can not retrieve your dashboard at this time' });
  }
});

// User Dashboard - log new hike
router.get('/dashboard/hike/new', async (req, res) => {
  res.render('newHike');
});

// User Dashboard - edit saved hike
router.get('/dashboard/hike/edit/:id', async (req, res) => {
  res.send(req.params.id);
});

// User Profile
// router.get('/profile/:id', async (req, res) => {});

module.exports = router;
