const userModel = require("./user")
const productModel = require("./product")

module.exports = {
	User: userModel,
	Product: productModel,
	Order: orderModel,
}
