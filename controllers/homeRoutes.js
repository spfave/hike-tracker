const router = require('express').Router();

// Application homepage
router.get('/', async (req, res) => {
  res.send('<h1>Hike Tracker Homepage</h1>');
});

module.exports = router;
