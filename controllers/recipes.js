const Recipe = require("../models/Recipe");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// all jobs associated to particular user by inserting createdBy: req.user.userId
const getAllRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json(allRecipes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot get all recipes" });
  }
};

const createRecipe = async (req, res) => {
  try {
    // this line takes the createdBy in Schema and connects to the recipe created. Attaching the user ID to the recipe before saving. Ensuring ownership at server-side
    req.body.createdBy = req.user.userId;
    const newRecipe = await Recipe.create(req.body);
    res.status(StatusCodes.CREATED).json({ newRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot create recipe" });
  }
};

const getRecipe = async (req, res) => {
  try {
    // connecting the selected recipe with the user that created the recipe
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;

    const getSelectedRecipe = await Recipe.findOne({
      _id: recipeId,
      createdBy: userId,
    });
    if (!getSelectedRecipe) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Recipe does not exist" });
    }
    res.status(StatusCodes.OK).json({ getSelectedRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot get selected recipe" });
  }
};

const updateRecipe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;

    const updateSelectedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, createdBy: userId },
      req.body,
      { returnDocument: "after", runValidators: true }
    );

    if (!updateSelectedRecipe) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "recipe does not exist" });
    }
    res.status(StatusCodes.OK).json({ updateSelectedRecipe });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "cannot get the selected recipe to update" });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;

    const deleteSelectedRecipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      createdBy: userId,
    });

    if (!deleteSelectedRecipe) {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: "recipe does not exist",
      });
    }
    res.status(StatusCodes.OK).json({ deleteSelectedRecipe });
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
