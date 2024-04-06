const express = require("express");

const adminLogin = require("../controllers/adminLogin");

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);

module.exports = adminRouter;
