const User = require("../models/user");

exports.login = (request, response, next) => {
  User.findById("605b59f6bc0cd67268f62916")
    .then((user) => {
      request.session.user = user;
      return request.session.save((err) => {
        console.log(err);
        if (!err) {
          response.status(200).send(user);
        } else {
          response
            .status(500)
            .send({ error: 500, msg: "Error to save session" });
        }
      });
    })
    .catch((err) => console.log(err));
};

exports.logout = (request, response, next) => {
  request.session.destroy((err) => {
    console.log("logout");

    response.status(200).send();
  });
};
