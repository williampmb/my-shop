exports.pageNotFound = (req, res, next) => {
  res.status(404).json({ error: 404, msg: "Page not found." });
};
