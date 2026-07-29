import mongoose from "mongoose";

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    default: " ",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Todo = mongoose.model("Todo", todoSchema);
