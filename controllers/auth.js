exports.login = (request, response, next) => {
  console.log("login");
  console.log("SESSION BEFORE", request.session);
  request.session.isLoggin = true;

  response.status(200).send();
};
