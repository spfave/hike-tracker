const router = require('express').Router();
const { Hike } = require('../../models');

// Post a Hike
router.post('/', async (req, res) => {
    try {
        const newHike = await Hike.create(req.body);
        res.status(201).json(newHike);
    } catch (error) {
        res.status(500).json(error);
    }    
});

// DELETE a Hike
router.delete('/:id', async (req, res) => {
    try {
      const newHike = await Hike.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!newHike) {
        res.status(404).json({ message: 'No hike found with this id!' });
        return;
      }
  
      res.status(200).json(newHike);
    } catch (err) {
      res.status(500).json(err);
    }
});
  
module.exports = router