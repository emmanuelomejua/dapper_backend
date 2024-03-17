const mongoose = require("mongoose");

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	address: { type: String, default: "" },
	isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
