const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "provide a recipe title"],
    trim: true,
    maxLength: [50, "name cannot be more than 50 characters"],
  },
});

module.exports = mongoose.model("recipe", RecipeSchema);
