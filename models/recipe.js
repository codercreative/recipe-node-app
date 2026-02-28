const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "provide a recipe title"],
    trim: true,
    maxLength: [50, "name cannot be more than 50 characters"],
  },
  ingredients: {
    type: [String],
    required: [true, "provide ingredients"],
    validate: [minOne, "provide at least one ingredient"],
  },
  instructions: {
    type: [String],
    required: [true, "please provide instructions"],
    validate: [minOne, "provide at least one instruction"],
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

module.exports = mongoose.model("recipe", RecipeSchema);
