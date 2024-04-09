const express = require("express")
const router = express.Router()
const controllers = require("../controllers")
const orderController = controllers.orderController

// POST request to create a new Order
router.post("/", orderController.createOrder)

// GET request to fetch all Orders
router.get("/", orderController.getAllOrders)

// GET request to fetch a single Order by ID
router.get("/:id", orderController.getOrderById)

// PUT request to update an Order by ID
router.put("/:id", orderController.updateOrderStatusAdmin)

// DELETE request to delete an Order by ID
router.delete("/:id", orderController.deleteOrder)

module.exports = router
