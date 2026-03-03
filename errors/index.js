const CustomAPIError = require("./custom-api");
const BadRequestError = require("./bad-request");
const UnAuthenticatedError = require("./unauthenticated");
const NotFoundError = require("./not-found");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnAuthenticatedError,
  NotFoundError,
};
