const { Order } = require("../models")
const { OrderItem } = require("../models/orderItem")

const createOrder = async (req, res) => {
	try {
		const { orderItems } = req.body
		// The best way to send this data from frontend is by sending the user's cart.
		//This way, the orderItems will be an array that contains object of both productId and quantity.

		const { userId } = req.user

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

		res.status(200).json({ success: true, authUrl, message: "Order created successfully." })
	} catch (error) {
		// console.log(error.response.data)
		res.status(500).json({
			success: false,
			error: error.message,
		})
	}
}

const getAllOrders = async (req, res) => {
	// try {
	// } catch (error) {
	// }
}

const getOrderById = async (req, res) => {
	// try {
	// } catch (error) {
	// }
}

const updateOrder = (req, res) => {
	// try {
	// } catch (error) {
	// }
}

const deleteOrder = async (req, res) => {
	// try {
	// } catch (error) {
	// }
}

module.exports = {
	createOrder,
	getAllOrders,
	getOrderById,
	updateOrder,
	deleteOrder,
}
