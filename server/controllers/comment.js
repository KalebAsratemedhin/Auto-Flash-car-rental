const Comment = require("../models/comment");

const addComment = async (req, res) => {
  try {
    console.log('comment', req.body)
    const { carId, content } = req.body;
    const userId = req.user.id;

    const existing = await Comment.findOne({userId, carId})

    if(existing){
      return res.status(400).json({message: 'You already have a comment. You can edit it.'})
    }

    const comment = await Comment.create({ userId, carId, content });
    res.status(201).json({message: 'Comment created.', data: comment});
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};

const getCommentsByCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const comments = await Comment.find({ carId }).populate("userId");
    res.status(200).json({ message: 'Comments fetched successfully', data: comments });

  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
}; 

const getOneComment = async (req, res) => {
    try {
      const { carId } = req.params;
      console.log('req.user', req.user)
      const userId = req.user.id
      const comment = await Comment.findOne({ carId, userId });
      
      res.status(200).json({ message: 'Comment fetched successfully', data: comment });

    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error fetching ratings", error });
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


const updateComment = async (req, res) => {
    try {
      console.log('comment update', req.body, req.params)
      const { commentId } = req.params;

      await Comment.findByIdAndUpdate(commentId, {content: req.body.content});
      res.status(200).json({ message: "Comment updated" });
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Error deleting comment", error });
    }
  };

module.exports = {
    addComment,
    getCommentsByCar,
    getOneComment,
    deleteComment,
    updateComment
}



