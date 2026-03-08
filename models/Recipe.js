const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxLength: [50, "name cannot be more than 50 characters"],
      required: [true, "provide a recipe title"],
    },
    ingredients: {
      type: [String],
      validate: [minOne, "provide at least one ingredient"],
      required: [true, "please provide ingredients"],
    },
    instructions: {
      type: [String],
      validate: [minOne, "provide at least one instruction"],
      required: [true, "please provide instructions"],
    },
    preparation: {
      type: Number,
      min: 1,
    },
    temp: {
      type: Number,
      min: 0,
      max: 600,
    },
    // The recipe will be tied to a user with createdBy
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

// reuseable function that checks that minimum 1 entry has been made in both ingredients and instructions
function minOne(array) {
  return array.length >= 1;
}

module.exports = mongoose.model("Recipe", RecipeSchema);
