const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  //check header
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnAuthenticatedError("Authentication invalid");
  }
  const token = authHeader.split(" ")[1];
  console.log("Token received: ", token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Payload: ", payload);
    // attach user to job routes
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    console.log(error);
    throw new UnAuthenticatedError("Authentication invalid");
  }
};

module.exports = auth;
