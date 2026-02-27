const getAllRecipes = (req, res) => {
  res.send("Get all recipes");
};

const createRecipe = (req, res) => {
  res.send("Create recipe");
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
