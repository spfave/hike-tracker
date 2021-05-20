const router = require('express').Router();

// Application homepage - list of trails and login/signup form
router.get('/', async (req, res) => {
  res.send('<h1>Hike Tracker Homepage</h1>');
});

// Trail Details
router.get('/trail/:id', async (req, res) => {});

// Trail - create new trail
router.get('/trail/new/', async (req, res) => {});

// Trail - edit saved trail
router.get('/trail/edit/:id', async (req, res) => {});

// User Dashboard
router.get('/dashboard/', async (req, res) => {});

// User Dashboard - log new hike
router.get('/dashboard/hike/new', async (req, res) => {});

// User Dashboard - edit saved hike
router.get('/dashboard/hike/edit/:id', async (req, res) => {});

// User Profile
// router.get('/profile/:id', async (req, res) => {});

module.exports = router;
