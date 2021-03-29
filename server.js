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
const session = require("express-session");
const SessionStore = require("connect-mongodb-session")(session);
const User = require("./models/user");

const csrfProtection = csrf();

const store = new SessionStore({
  uri: process.env.DATABASE,
  collection: "sessions",
});
const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001", // contains the frontend url
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    key: "userInfo",
    secret: "longanhardsecrettohashthesessions",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: { maxAge: 3600000 },
  })
);

app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

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
