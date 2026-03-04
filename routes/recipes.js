const express = require("express");
const router = express.Router();

const {
  getAllRecipes,
  createRecipe,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipes");

router.get("/", getAllRecipes);
router.post("/", createRecipe);
router.get("/:recipeId", getRecipe);
router.patch("/:recipeId", updateRecipe);
router.delete("/:recipeId", deleteRecipe);

module.exports = router;
