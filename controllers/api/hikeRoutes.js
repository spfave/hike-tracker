const router = require('express').Router();
const { Hike } = require('../../models');

// POST a Hike
router.post('/', async (req, res) => {
  try {
    const newHike = await Hike.create({
      ...req.body,
      user_id: req.user.id,
    });
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
        id: req.params.id,
      },
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

// GET a Hike
router.get('/:id', async (req, res) => {
  try {
    const newHike = await Hike.findByPk(req.params.id);
    if (!newHike) {
      res.status(404).json({ message: 'No trail with this id!' });
      return;
    }
    res.status(200).json(newHike);
  } catch (err) {
    res.status(500).json(err);
  }
});

/// PUT update a trail
router.put('/:id', async (req, res) => {
  try {
    const newHike = await Hike.findByPk(req.params.id);

    if (findTrail) {
      const newHike = await Hike.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(newHike);
    } else {
      res.status(404).json({ message: 'No hike with this id!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
