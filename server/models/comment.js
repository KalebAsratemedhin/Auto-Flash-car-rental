const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 500,
  },
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);
