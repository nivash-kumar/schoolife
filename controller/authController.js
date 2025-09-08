// studentController.js
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModule");

exports.getsignup = (req, res, next) => {
  const isLoggedIn = req.isLoggedIn;
  if (!isLoggedIn) {
    res.render("../views/auth/signup", {
      pageTitle: "Register Your self.",
      isLoggedIn: false,
      oldInput: { name: "", email: "", userType: "" },
      error: [],
      user: {},
    });
  } else {
    res.redirect("/");
  }
};

exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.isLoggedIn;
  if (!isLoggedIn) {
    res.render("../views/auth/login", {
      pageTitle: "Login Here!",
      isLoggedIn: false,
      error: [],
      oldInput: { email: "", password: "" },
      user: {},
    });
  } else {
    console.log("loggedIn user try to login again!");
    res.redirect("/");
  }
};

exports.postsignup = [
  check("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Name should be long!")
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Name should be alphabers"),

  check("email").isEmail().withMessage("Invalid Email").normalizeEmail(),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["student", "teacher", "admin"])
    .withMessage("Invalid user type"),

  check("password")
    .isLength([6])
    .matches(/[a-z0-9]/)
    .withMessage("password shold be character or number"),

  async (req, res, next) => {
    const { name, email, userType, password } = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Register Here",
        isLoggedIn: false,
        error: error.array().map((err) => err.msg),
        oldInput: { name, email, userType },
        user: {},
      });
    }
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const user = new User({
          name,
          email,
          userType,
          dublicatePassword: password,
          password: hashedPassword,
        });
        user.save().catch((err) => {
          return res.status(402).render("/auth/signup", {
            pageTitle: "register Here",
            error: [err.msg],
            oldInput: { name, email, userType },
            isLoggedIn: false,
            user: {},
          });
        });
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(402).render("/auth/signup", {
          pageTitle: "register Here",
          error: [err.msg],
          oldInput: { name, email, userType },
          isLoggedIn: false,
          user: {},
        });
      });
  },
];

exports.postLogin = async (req, res, next) => {
  console.log("post users data ", req.body);
  const { email, userType, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login faild!",
      isLoggedIn: false,
      error: ["User not found"],
      oldInput: { email: email},
      user: {},
    });
  }
  const isPassMatch = await (bcrypt.compare(password, user.password));
  const isUserMatch = (userType === user.userType);
  if (!isPassMatch && !isUserMatch) {
    return res.status(422).render("auth/login", {
      pageTitle: "Login faild!",
      isLoggedIn: false,
      error: ["Incorrect password or UserType"],
      oldInput: { email, userType},
      user: {},
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = user;
  await req.session.save();
  res.redirect("/");
};

exports.postLogout = async (req, res, next) => {
  req.session.isLoggedIn = false;
  console.log("res.session before destroy>>>>>>>>>>>>>", req.session);
  // req.session.destroy()
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session:", err);
    }
  res.redirect("/login");
  });
};
