const userModel = require("./user")
const productModel = require("./products")
const orderModel = require("./orders")
const orderItemModel = require("./orderItem")
const cartModel = require("./cart")

module.exports = {
	User: userModel,
	Product: productModel,
	Order: orderModel,
	OrderItem: orderItemModel,
	Cart: cartModel,
}
