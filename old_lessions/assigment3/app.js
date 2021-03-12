const express = require("express");
const path = require("path");
const app = express();
const userRoute = require("./routes/user");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(userRoute);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "views", "page-not-found.html"));
});

app.listen(3000);
