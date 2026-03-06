const notFound = (req, res) =>
  res.status(404).type("html").send("<h1>Page does not exist</h1>");

module.exports = notFound;
