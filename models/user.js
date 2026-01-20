const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    prepTimeMinutes: {
      type: Number,
      min: 0,
    },
    cookTimeMinutes: {
      type: Number,
      min: 0,
    },
    totalTimeMinutes: {
      type: Number,
      min: 0,
    },
    serving: {
      type: Number,
      min: 1,
    },
    ingredients: {
      type: String,
    },
    instructions: {
      type: String,
    },
    cuisine: {
      type: String,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
    },
  },
  { timestamps: true },
);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: {
    type: [foodSchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
