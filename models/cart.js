const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
	// Reference to the user who owns the cart
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
	// Array of products in the cart, each with a reference to the product and its quantity
	products: [
		{
			product: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Product",
				required: true,
			}, // Reference to the product
			quantity: { type: Number, required: true }, // Quantity of the product
		},
	],
	// Timestamp for when the cart was created
	createdAt: { type: Date, default: Date.now },
})

// Create a model based on the schema
const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart
