const express = require("express")

const controllers = require("../controllers")
const adminLoginController = controllers.adminLoginController

const router = express.Router()

router.post("/login", adminLoginController.adminLogin)

module.exports = router
