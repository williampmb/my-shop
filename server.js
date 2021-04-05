require("dotenv").config();
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");
const path = require("path");
const cors = require("cors");
const csrf = require("csurf");
const errorController = require("./controllers/erro");
const mongoose = require("mongoose");
const User = require("./models/user");

const csrfProtection = csrf();

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001", // contains the frontend url
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Headers",
      "Content-Type",
      "Authorization",
    ],
  })
);
/*app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//app.use(csrfProtection);

app.use(authRoutes);
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

mongoose
  .connect(process.env.DATABASE + "?retryWrites=true&w=majority")
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
