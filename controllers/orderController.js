const models = require("../models")
const Order = models.Order
const OrderItem = models.OrderItem
const cron = require("node-cron")

const createOrder = async (req, res) => {
	try {
		const { orderItems } = req.body
		// The best way to send this data from frontend is by sending the user's cart.
		//This way, the orderItems will be an array that contains object of both productId and quantity.

		const { userId } = req.body

		const orderItemIds = Promise.all(
			orderItems.map(async (orderItem) => {
				let newOrderItem = new OrderItem({
					quantity: orderItem.quantity,
					product: orderItem.product,
				})
				newOrderItem = await newOrderItem.save()
				return newOrderItem._id
			})
		)
		const orderItemsIdsResolved = await orderItemIds

		const totalPrices = await Promise.all(
			orderItemsIdsResolved.map(async (orderItemId) => {
				const orderItem = await OrderItem.findById(orderItemId).populate("product")
				const totalPrice = orderItem.product.price * orderItem.quantity
				return totalPrice
			})
		)
		const totalPrice = totalPrices.reduce((a, b) => a + b, 0)

		let order = new Order({
			orderItems: orderItemsIdsResolved,
			totalPrice,
			user: userId,
		})

		order = await order.save()

		if (!order) {
			return res.status(400).json({
				success: false,
				message: "Order could not be created.",
			})
		}

		res.status(201).json({ message: "Order created successfully.", order })
	} catch (error) {
		console.log("Create order error", error)
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

const getAllOrders = async (req, res) => {
	try {
		const orders = await Order.find({})
		if (!orders) return res.status(404).json({ error: "Cannot fetch orders" })
		return res.status(200).json(orders)
	} catch (error) {
		console.log("Get all orders error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

const getOrderById = async (req, res) => {
	try {
		const { orderId } = req.params
		if (!orderId) return res.status(400).json({ error: "Produce a valid order ID" })
		const order = await Order.findById(orderId)
		if (!order) return res.status(404).json({ error: "Order not found" })
		console.log(order.toJSON())
		return res.status(200).json(order)
	} catch (error) {
		console.log("Get single order error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

const updateOrderStatusAuto = async () => {
	try {
		const ordersToUpdate = await Order.find({
			status: "pending",
			createdAt: { $lte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
		})

		await Promise.all(
			ordersToUpdate.map(async (order) => {
				order.status = "approved"
				await order.save()
			})
		)

		console.log("Order status updated successfully.")
	} catch (error) {
		console.error("Error updating order status:", error)
	}
}

const updateOrderStatusAdmin = async (req, res) => {
	try {
		const { orderId } = req.params
		const { status } = req.body
		if (!orderId) return res.status(400).json({ error: "Produce a valid order ID" })

		const updatedOrder = await Order.findByIdAndUpdate(
			orderId,
			{ status: status ? status : "approved" },
			{ new: true, runValidators: true }
		)

		if (!updatedOrder) {
			return res.status(404).json({ message: "Order not found" })
		}

		return res.status(200).json({ order: updatedOrder })
	} catch (error) {
		if (error.name === "ValidationError") {
			return res.status(400).json({ error: error.message })
		}
		console.error("Error updating order:", error)
		return res.status(500).json({ error: "Internal server error" })
	}
}

const deleteOrder = async (req, res) => {
	try {
		const { orderId } = req.params
		if (!orderId) return res.status(400).json({ error: "Produce a valid order ID" })

		const deletedOrder = await Order.findByIdAndDelete(orderId)

		if (!deletedOrder) {
			return res.status(404).json({ error: "Order not found" })
		}

		return res.status(200).json({ message: "Order deleted successfully" })
	} catch (error) {
		console.error("Error deleting order:", error)
		return res.status(500).json({ success: false, error: "Internal server error" })
	}
}

cron.schedule("0 0 * * *", updateOrderStatusAuto)

module.exports = {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrderStatusAdmin,
	deleteOrder,
}
