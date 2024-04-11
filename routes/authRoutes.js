const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const authController = controllers.authController;

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
