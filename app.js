//Core modules
const path = require("path");

//External modules...
const express = require("express");
const { default: mongoose } = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const DB_PATH ="mongodb+srv://SinghKN:singhknwork@singhkn.v0hajwv.mongodb.net/school-management?retryWrites=true&w=majority&appName=singhKn";

//Internal modules...
const rootDir = require("./utils/pathUtil");
const authRouter = require("./router/authRouter");
const storeRouter = require("./router/storeRouter");
const errorController = require("./controller/errorController");

const app = express();
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: "sessions",
});

app.use(express.static(path.join(rootDir, "public")));

app.use(express.urlencoded());
app.use(
  session({
    secret: "This page is dedicated to SinghKN",
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn || false;
  console.log("request is : ", req.isLoggedIn);
  next();
});

app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

//// Uses our routers
app.use(authRouter);
app.use(storeRouter);
app.use(errorController.pageNotFound);

const port = 3000;
mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Mongoose Connected successfuly");
    app.listen(port, () => {
      console.log(`Server is running on PORT >> http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Error While connecting Mongoose:", err);
  });
