const router = require('express').Router();
const { User, Trail, Hike, Comment } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const newTrail = await Trail.create(req.body);
        res.status(201).json(newTrail);
    } catch (error) {
        res.status(500).json(error);
    }    
});

module.exports = router
