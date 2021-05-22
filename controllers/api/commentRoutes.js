const router = require('express').Router();
const { Comment } = require('../../models');

// Create new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error posting comment, please try again' });
  }
});

// Edit comment
router.put('/:id', async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: { id: req.params.id },
    });

    if (!commentData[0]) {
      res.status(404).json({ message: `Comment does not exist to update` });
      return;
    }

    res.status(200).json(commentData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not update post, please try again' });
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });

    if (!commentData) {
      res.status(404).json({ message: `Post does not exist to delete` });
      return;
    }

    res.status(200).json(commentData);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not delete post, please try again' });
  }
});

module.exports = router;
