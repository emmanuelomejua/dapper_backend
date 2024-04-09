const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	orderItems: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "OrderItem",
			required: true,
		},
	],
	status: {
		type: String,
		enum: ["pending", "approved", "delivered"],
		default: "pending",
	},
	createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model("Order", orderSchema)

module.exports = Order
