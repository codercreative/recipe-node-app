const Recipe = require("../models/Recipe");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

// all jobs associated to particular user by inserting createdBy: req.user.userId
const getAllRecipes = async (req, res, next) => {
  try {
    const allRecipes = await Recipe.find({ createdBy: req.user.userId });
    res.status(StatusCodes.OK).json(allRecipes);
  } catch (error) {
    // res.status(500).json({ error: "cannot get all recipes" });
    next(error);
  }
};

const createRecipe = async (req, res, next) => {
  try {
    // this line takes the createdBy in Schema and connects to the recipe created. Attaching the user ID to the recipe before saving. Ensuring ownership at server-side
    req.body.createdBy = req.user.userId;
    const newRecipe = await Recipe.create(req.body);
    res.status(StatusCodes.CREATED).json({ newRecipe });
  } catch (error) {
    // res.status(500).json({ error: "cannot create recipe" });
    next(error);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    // connecting the selected recipe with the user that created the recipe
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;

    const getSelectedRecipe = await Recipe.findOne({
      _id: recipeId,
      createdBy: userId,
    });
    if (!getSelectedRecipe) {
      // return res
      //   .status(StatusCodes.NOT_FOUND)
      //   .json({ error: "Recipe does not exist" });
      throw new NotFoundError("Recipe does not exist");
    }
    res.status(StatusCodes.OK).json({ getSelectedRecipe });
  } catch (error) {
    // res.status(500).json({ error: "cannot get selected recipe" });
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;

    const updateSelectedRecipe = await Recipe.findOneAndUpdate(
      { _id: recipeId, createdBy: userId },
      req.body,
      { returnDocument: "after", runValidators: true }
    );

    if (!updateSelectedRecipe) {
      // return res
      //   .status(StatusCodes.NOT_FOUND)
      //   .json({ error: "recipe does not exist" });
      throw new NotFoundError("Recipe does not exist");
    }
    res.status(StatusCodes.OK).json({ updateSelectedRecipe });
  } catch (error) {
    // res.status(500).json({ error: "cannot get the selected recipe to update" });
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;

    const deleteSelectedRecipe = await Recipe.findOneAndDelete({
      _id: recipeId,
      createdBy: userId,
    });

    if (!deleteSelectedRecipe) {
      // return res.status(StatusCodes.NOT_FOUND).json({
      //   error: "recipe does not exist",
      // });
      throw new NotFoundError("Recipe does not exist");
    }
    res.status(StatusCodes.OK).json({ deleteSelectedRecipe });
  } catch (error) {
    next(error);
    // res.status(500).json({ error: "cannot delete selected recipe" });
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
};
