const router = require('express').Router();
const { Trail } = require('../../models');

// Post a Trail
router.post('/', async (req, res) => {
    try {
        const newTrail = await Trail.create(req.body);
        res.status(201).json(newTrail);
    } catch (error) {
        res.status(500).json(error);
    }    
});



// DELETE a Trail
router.delete('/:id', async (req, res) => {
    try {
      const newTrail = await Trail.destroy({
        where: {
          id: req.params.id
        }
      });
  
      if (!newTrail) {
        res.status(404).json({ message: 'No trail found with this id!' });
        return;
      }
  
      res.status(200).json(newTrail);
    } catch (err) {
      res.status(500).json(err);
    }
});

  
module.exports = router