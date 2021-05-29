const Sequelize = require('sequelize');
const router = require('express').Router();
const { User, Trail, Hike, Comment } = require('../models');
const sequelize = require('../config/connection');

// Application homepage - list of trails and login/signup form
router.get('/', async (req, res) => {
  try {
    const trailData = await Trail.findAll({
      order: Sequelize.literal('rand()'),
      limit: 5,
    });
    const trails = trailData.map((trail) => trail.get({ plain: true }));

    res.render('homepage', { trails, loggedIn: req.session.loggedIn });
    // res.json({ trails }); // TESTING
  } catch (error) {
    res.status(500).json(error);
  }
});

// Trail - create new trail
router.get('/trail/new', (req, res) => {
  // res.send('Test');
  res.render('newTrail', { loggedIn: true });
});

// Trail - edit saved trail
router.get('/trail/edit/:id', async (req, res) => {
  res.send(req.params.id);
});

// Trail Details
router.get('/trail/:id', async (req, res) => {
  try {
    const trailData = await Trail.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: Comment,
      //     include: [{ model: User, attributes: ['username'] }],
      //   },
      // ],
    });
    const trail = trailData.get({ plain: true });

    res.render('trailView', { ...trail, loggedIn: req.session.loggedIn });
    // res.json({ ...trail }); // TESTING
  } catch (error) {
    res.status(500).json(error);
  }
});

// User Dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: Hike, include: [{ model: Trail }] }],
    });
    const user = userData.get({ plain: true });
    const uniqueTrails = await sequelize.query(
      'SELECT distinct t.* FROM trail t join hike h on h.trail_id = t.id where user_id = ?',
      {
        model: Trail,
        mapToModel: true,
        replacements: [req.session.userId],
      }
    );
    const uniqueTrailsPlain = uniqueTrails.map((trail) =>
      trail.get({ plain: true })
    );
    res.render('dashboard', {
      ...user,
      uniqueTrails: uniqueTrailsPlain,
      loggedIn: true,
    });
    // res.json(user); // TESTING
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Can not retrieve your dashboard at this time' });
  }
});

// User Dashboard - log new hike
router.get('/dashboard/hike/new', async (req, res) => {
  try {
    const trailData = await Trail.findAll({
      attributes: ['id', 'name'],
    });
    const trails = trailData.map((trail) => trail.get({ plain: true }));

    res.render('newHike', { trails, loggedIn: true });
    // res.json({ trails }); // TESTING
  } catch (error) {
    res.status(500).json(error);
  }
});

// User Dashboard - edit saved hike
router.get('/dashboard/hike/edit/:id', async (req, res) => {
  res.send(req.params.id);
});

// User Dashboard - view hike
router.get('/dashboard/hike/:id', async (req, res) => {
  try {
    //  Pull hike data
    const hikeData = await Hike.findByPk(req.params.id, {
      include: [{ model: Trail }],
    });
    const hike = hikeData.get({ plain: true });

    res.render('hikeView', { ...hike, loggedIn: true });
    // res.json(hike); // TESTING
  } catch (error) {
    res.status(500).json(error);
  }
});

// User Profile
// router.get('/profile/:id', async (req, res) => {});

// Login/Sign up page
router.get('/login', (req, res) => {
  res.render('login');
});

module.exports = router;
