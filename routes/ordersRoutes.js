const express = require("express")
const router = express.Router()
const controllers = require("../controllers")
const orderController = controllers.orderController

// POST request to create a new Order
router.post("/", orderController.createOrder)

// GET request to fetch all Orders
// I need to implement a middleware here that verifies if a user is logged in. I won't be able to do that unless auth-register works well and is an admin
router.get("/", orderController.getAllOrders)

// GET request to fetch a single Order by ID
// I need to implement a middleware here that verifies if a user is logged in. I won't be able to do that unless auth-register works well and is an admin
router.get("/:orderId", orderController.getOrderById)

// GET request to fetch a single Order by userID
// I need to implement a middleware here that verifies if a user is logged in. I won't be able to do that unless auth-register works well
router.get("/user/:userId", orderController.getOrderByUserId)

// PUT request to update an Order by orderId
// I need to implement a middleware here that verifies if a user is logged in. I won't be able to do that unless auth-register works well and is an admin
router.put("/:orderId", orderController.updateOrderStatusAdmin)

// DELETE request to delete an Order by orderId
// I need to implement a middleware here that verifies if a user is logged in. I won't be able to do that unless auth-register works well and is an admin
router.delete("/:orderId", orderController.deleteOrder)

module.exports = router
