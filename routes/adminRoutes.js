const express = require("express")

const controllers = require("../controllers")
const adminLogin = controllers.adminLoginController

const adminRouter = express.Router()

adminRouter.post("/login", adminLogin)

module.exports = adminRouter
