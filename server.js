const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const cors = require("cors");
const errorController = require("./controllers/erro");
const mongoConnect = require("./utils/database").mongoConnect;
const User = require("./models/user");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("605a57cafe63d6d6547832b1")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

mongoConnect(() => {
  app.listen(3000);
});
