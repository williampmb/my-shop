module.exports = (request, response, next) => {
  if (!request.session.user) {
    console.log("NOT VALID SESSION USER", request.session.user);
    return res.status(403).send();
  }
  next();
};
