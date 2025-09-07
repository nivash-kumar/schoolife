// studentController.js
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModule");

exports.getsignup = (req, res, next) => {
  const isLoggedin = req.isLoggedin;
  console.log("isLoggedin", isLoggedin);
  if (!isLoggedin) {
    res.render("../views/auth/signup", {
      pageTitle: "Register Your self.",
      isLoggedin: false,
      oldInput: {},
      error: [],
    });
  } else {
    res.redirect("/");
  }
};

exports.getLogin = (req, res, next) => {
  const isLoggedin = req.get("cookie");
  if (!isLoggedin) {
    res.render("../views/auth/login", {
      pageTitle: "Login Here!",
      isLoggedin: false,
    });
  } else {
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
    console.log("Error is the :", error);
    if (!error.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Register Here",
        isLoggedin: false,
        error: error.array().map((err) => err.msg),
        oldInput: { name, email, userType },
      });
    }
    bcrypt
      .hash(password, 10)
      .then((hashedPassword) => {
        const user = new User({
          name,
          email,
          userType,
          password: hashedPassword,
        });
        user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch((err) => {
        return res.status(402).render("/auth/signup", {
          pageTitle: "register Here",
          err: [err.msg],
          oldInput: { name, email, userType },
        });
      });
  },
];

exports.postLogin = async (req, res, next) => {
  console.log("post users data ", req.body);
  const { email, userType, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("./wrongResult", {
          pageTitle: "Login faild!",
          isLoggedin: false,
          error:"User not found",
          oldInput: {email},
        });
      } else {
        const isMatch = await (bcrypt.compare(hashedPassword, password) && (user.userType === userType));
        if (isMatch) {
          console.log("User logined successfully");
          // const token = jwt.sign({)
          res.cookie("isLoggedin", true);
          res.redirect("/");
        } else {
          res.render("./wrongResult", {
            pageTitle: "Login faild!",
            isLoggedin: false,
            message: "Incorrect password or UserType",
          });
        }
      }
    })
    .catch((err) => {
      console.log("Error while Login", err);
      res.redirect("/login");
    });
};
