const jwt = require("jsonwebtoken");

module.exports = (request, response, next) => {
  const authHeader = request.get("Authorization");
  console.log("AUTHORIZATION:", authHeader);
  if (!authHeader) {
    return response.status(403).send();
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    console.log("CHEGOU NO SERVIDOR");
    decodedToken = jwt.verify(token, process.env.JWTSECRET);
  } catch (err) {
    console.log(err);
    err.statusCode = 500;
    return response.status(403).send();
  }

  if (!decodedToken) {
    const error = new Error("Not authenticaded.");
    error.statusCode = 401;
  }

  request.userId = decodedToken.userId;
  next();
};
