const Comment = require("../models/comment");

const addComment = async (req, res) => {
  try {
    const { carId, content } = req.body;
    const userId = req.user.id;

    const comment = new Comment({ userId, carId, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const getCommentsByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const comments = await Comment.find({ carId }).populate("userId", "name");
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    await Comment.findByIdAndDelete(commentId);
    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error });
  }
};


module.exports = {
    addComment,
    getCommentsByCar,
    deleteComment
}



