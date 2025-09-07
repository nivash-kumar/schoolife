//Core modules
const path = require("path");

//External modules...
const express = require("express");
const { default: mongoose } = require("mongoose");

//Internal modules...   
const rootDir = require("./utils/pathUtil");
const authRouter = require("./router/authRouter");
// const teacherRouter = require("./router/teacherRouter");
const storeRouter = require("./router/storeRouter");
const errorController = require("./controller/errorController");


const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, "public")));

app.use((req, res, next) => {
console.log("cookie check middleware", req.get("cookie"));
  req.isLoggedIn = req.get("cookie")
    ? req.get("cookie").split("=")[1] === "true"
    : false;
  next();
});

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//// Uses our routers
app.use(authRouter);
app.use(storeRouter);
// app.use(teacherRouter);
app.use(errorController.pageNotFound);

const port = 3000;
const DB_PATH =
  "mongodb+srv://SinghKN:singhknwork@singhkn.v0hajwv.mongodb.net/school-management?retryWrites=true&w=majority&appName=singhKn";
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("MOngoose Connected successfuly");
    app.listen(port, () => {
      console.log(`Server is running on PORT >> http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error While connecting Mongoose:", err);
  });
