const router = require('express').Router();

// Application homepage
router.get('/', async (req, res) => {
  res.send('<h1>Hike Tracker Homepage</h1>');
});

// Trails
router.get('/trail/', async (req, res) => {});

// Trail Details
router.get('/trail/:id', async (req, res) => {});

// User Dashboard
router.get('/dashboard/', async (req, res) => {});

// User Dashboard - log new hike
router.get('/dashboard/hike/log', async (req, res) => {});

// User Dashboard - edit saved hike
router.get('/dashboard/hike/edit/:id', async (req, res) => {});

// User Profile
router.get('/profile/:id', async (req, res) => {});

// Login
router.get('/login', (req, res) => {});

// Signup
router.get('/signup', (req, res) => {});

module.exports = router;