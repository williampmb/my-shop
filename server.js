const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("path");
const cors = require("cors");
const errorController = require("./controllers/erro");

const app = express();
app.set("view engine", "pug");
app.set("views", "views");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.pageNotFound);

app.listen(3000);
