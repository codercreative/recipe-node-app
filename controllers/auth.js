const register = async (req, res) => {
  res.send("register user");
};

const login = async (req, res) => {
  res.send("log in user");
};

module.exports = { register, login };
