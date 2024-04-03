const userModel = require("./user")
const productModel = require("./products")
const orderModel = require("./orders")

module.exports = {
	User: userModel,
	Product: productModel,
	Order: orderModel,
}
