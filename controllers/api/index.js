const router = require('express').Router();
//const userRoutes = require('./userRoutes');
const trailRoutes = require('./trailRoutes');
const hikeRoutes = require('./hikeRoutes');


//router.use('/users', userRoutes);
router.use('/trails', trailRoutes);
router.use('/hikes', hikeRoutes);

module.exports = router;
