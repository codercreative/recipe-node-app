const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    maxLength: [50, "name cannot be more than 50 characters"],
    required: [true, "provide a recipe title"],
  },
  ingredients: {
    type: [String],
    validate: [minOne, "provide at least one ingredient"],
    required: [true, "provide ingredients"],
  },
  instructions: {
    type: [String],
    validate: [minOne, "provide at least one instruction"],
    required: [true, "please provide instructions"],
  },
  prepTime: {
    type: Number,
    min: 1,
  },
  ovenTemp: {
    type: Number,
    min: 100,
    max: 600,
  },
});

function minOne(array) {
  return array.length >= 1;
}

module.exports = mongoose.model("Recipe", RecipeSchema);
