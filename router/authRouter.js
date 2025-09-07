const express = require("express");
const authRouter = express.Router();

//local module
const authController = require("../controller/authContoller");

authRouter.get("/login", authController.getLogin);
authRouter.get("/signup", authController.getsignup);
authRouter.post("/signup", authController.postsignup);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;
