const router = require('express').Router();
const { Comment } = require('../../models');

// Create new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json('Error posting comment, please try again');
  }
});

module.exports = router;
