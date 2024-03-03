const express = require("express");
const path = require("path");
const { connectToMongoDb } = require("./connect");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectToMongoDb("mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

//Using EJS template engine for SSR - EJS file are simply known for html files
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL"]), urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => console.log(`Server Stated at Port: ${PORT}`));
