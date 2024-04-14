const express = require("express")
const router = express.Router()
const controllers = require("../controllers")
const orderController = controllers.orderController

// POST request to create a new Order
router.post("/", orderController.createOrder)

// GET request to fetch all Orders
router.get("/", orderController.getAllOrders)

// GET request to fetch a single Order by ID
router.get("/:orderId", orderController.getOrderById)

// PUT request to update an Order by orderId
router.put("/:orderId", orderController.updateOrderStatusAdmin)

// DELETE request to delete an Order by orderId
router.delete("/:orderId", orderController.deleteOrder)

module.exports = router
