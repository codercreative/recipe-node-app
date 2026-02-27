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
router.get("/:id", getRecipe);
router.patch("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
