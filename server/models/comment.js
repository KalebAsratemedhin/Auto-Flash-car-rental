import mongoose from "mongoose";

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

const Comment = mongoose.model("Comment", commentSchema);
export default Comment; 
