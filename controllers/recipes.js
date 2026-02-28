const recipe = require("../models/recipe");

const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await recipe.find({});
    res.status(200).json(allRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot get all recipes" });
  }
};

const createRecipe = async (req, res) => {
  try {
    const newRecipe = await recipe.create(req.body);
    res.status(201).json({ newRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot create recipe" });
  }
};

const getRecipe = async (req, res) => {
  try {
    const getSelectedRecipe = await recipe.findOne({ _id: req.params.id });
    if (!getSelectedRecipe) {
      return res.status(404).json({ error: "recipe does not exist" });
    }
    res.status(200).json({ getSelectedRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot get selected recipe" });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const updateSelectedRecipe = await recipe.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateSelectedRecipe) {
      return res.status(404).json({ error: "recipe does not exist" });
    }
    res.status(200).json({ updateSelectedRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot get the selected recipe to update" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const deleteSelectedRecipe = await recipe.findOneAndDelete({
      _id: req.params.id,
    });

    if (!deleteSelectedRecipe) {
      return res.status(404).json({ error: "recipe does not exist" });
    }
    res.status(200).json({ deleteSelectedRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot delete selected recipe" });
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
