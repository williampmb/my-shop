const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.login = (request, response, next) => {
  const email = request.body.username;
  const password = request.body.password;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        response.status(500).send({ error: "login or password wrong" });
      }
      console.log("user", user);
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
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
          }
          console.log("doesnt match");
          return response
            .status(500)
            .send({ error: "email or password wrong" });
        })
        .catch((err) => {
          console.log(err);
          response.status(500).send({ error: "something wrong" });
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

exports.signup = (request, response, next) => {
  console.log("got here");
  let username = request.body.username;
  let password = request.body.password;
  console.log("e", username, "p", password);

  User.findOne({ email: username })
    .then((doc) => {
      if (doc) {
        console.log("duplicated email");
        response.status(500).send({ error: "duplicated email" });
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashPassword) => {
      const user = new User({
        email: username,
        password: hashPassword,
        cat: { items: [] },
      });
      return user.save();
    })
    .then((result) => {
      response.status(200).send();
    })
    .catch((err) => console.log());
};
