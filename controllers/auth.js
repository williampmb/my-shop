const User = require("../models/user");

exports.login = (request, response, next) => {
  User.findById("605b59f6bc0cd67268f62916")
    .then((user) => {
      request.session.user = user;
      console.log("userlogin");
      response.status(200).send();
    })
    .catch((err) => console.log(err));
};
