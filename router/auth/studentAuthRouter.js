const express = require("express");
const studentAuthRouter = express.Router();

//local module
const studentAuthController = require("../../controller/auth/studentAuthContoller");

studentAuthRouter.get("/login", studentAuthController.getLoginStudent);
studentAuthRouter.get("/signup", studentAuthController.getsignupStudent);
studentAuthRouter.post("/signup", studentAuthController.postsignupStudent);
studentAuthRouter.post("/login", studentAuthController.postLoginStudent);

module.exports = studentAuthRouter;
