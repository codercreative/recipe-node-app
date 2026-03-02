const notFound = (req, res) =>
  res.status(404).json({ error: "page does not exist" });

module.exports = notFound;
