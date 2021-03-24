require("dotenv").config();
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const cors = require("cors");
const errorController = require("./controllers/erro");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("605b59f6bc0cd67268f62916")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

mongoose
  .connect(process.env.DATABASE)
  .then((result) => {
    console.log("CONNECTED");
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "bob",
          email: "b@b.com",
          cart: { items: [] },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => console.log(err));
