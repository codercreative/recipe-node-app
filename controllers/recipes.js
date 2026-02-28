const recipe = require("../models/recipe");

const getAllRecipes = (req, res) => {
  res.send("Get all recipes");
};

const createRecipe = async (req, res) => {
  const newRecipe = await recipe.create(req.body);
  res.status(201).json({ newRecipe });
};

const getRecipe = (req, res) => {
  res.send("Get selected recipe");
};

const updateRecipe = (req, res) => {
  res.send("Update recipe");
};

const deleteRecipe = (req, res) => {
  res.send("Delete recipe");
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
