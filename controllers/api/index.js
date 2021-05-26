const router = require('express').Router();

const userRoutes = require('./userRoutes');
const trailRoutes = require('./trailRoutes');
const hikeRoutes = require('./hikeRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/trails', trailRoutes);
router.use('/hikes', hikeRoutes);
router.use('/comments', commentRoutes);

module.exports = router;
