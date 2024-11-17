import Comment from "../models/comment.js";

// Add a comment to a car
export const addComment = async (req, res) => {
  try {
    const { carId, content } = req.body;
    const userId = req.user.id;

    const existing = await Comment.findOne({ userId, carId });
    if (existing) {
      return res.error('You already have a comment. You can edit it.', 400);
    }

    const comment = await Comment.create({ userId, carId, content });
    res.success('Comment created.', 201, comment);
  } catch (error) {
    res.error('Error adding comment', 500, [error.message]);
  }
};

// Get all comments for a car
export const getCommentsByCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const comments = await Comment.find({ carId }).populate('userId');
    res.success('Comments fetched successfully', 200, comments);
  } catch (error) {
    res.error('Error fetching comments', 500, [error.message]);
  }
};

// Get a single comment by the logged-in user for a car
export const getOneComment = async (req, res) => {
  try {
    const { carId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findOne({ carId, userId });
    if (!comment) return res.error('Comment not found.', 404);

    res.success('Comment fetched successfully', 200, comment);
  } catch (error) {
    res.error('Error fetching comment', 500, [error.message]);
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.error('Comment not found.', 404);

    await comment.deleteOne();
    res.success('Comment deleted successfully', 200);
  } catch (error) {
    res.error('Error deleting comment', 500, [error.message]);
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.error('Comment not found.', 404);

    comment.content = content;
    await comment.save();

    res.success('Comment updated successfully', 200, comment);
  } catch (error) {
    res.error('Error updating comment', 500, [error.message]);
  }
};
