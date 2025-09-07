const express = require("express");
const authRouter = express.Router();

//local module
const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);
authRouter.get("/signup", authController.getsignup);
authRouter.post("/signup", authController.postsignup);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
