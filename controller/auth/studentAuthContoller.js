// studentController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Student = require("../../models/auth/Student");

exports.getsignupStudent = (req, res, next) => {
  res.render("./student/signupStudent", {
    pageTitle: "signup Student",
  });
};

exports.getLoginStudent = (req, res, next) => {
  res.render("./student/loginStudent", {
    pageTitle: "Login Student",
  });
};

exports.postsignupStudent = async (req, res, next) => {
  console.log("SignUp data...........................", req.body);
  const { name, email, password } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 10);
  const student = new Student({
    name,
    email,
    password,
    // password: hashedPassword,
  });
  student.save().then(() => {
    console.log("Student signuped successfully");
  });
  res.redirect("/login");
};

exports.postLoginStudent = async (req, res) => {
  console.log("login data...........................", req.body);
  const { email, password } = req.body;
  Student.findOne({ email }).then((student) => {
    if (student.password === password){
      console.log("Student logined successfully");
      // const token = jwt.sign({)
      res.redirect("/");
    }else{
      console.log("Wrong Password", password);
      res.redirect("/login");
    }
  }).catch((err) => {
    console.log("Error while Login", err);
    res.redirect("/login");
  })
};