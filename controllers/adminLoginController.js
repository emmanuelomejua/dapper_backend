const bcrypt = require("bcryptjs")
const generateToken = require("../controllers/authController")

const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body

		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ message: "Invalid credentials" })
		}

		const isMatch = await bcrypt.compare(password, user.password)
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" })
		}

		const token = generateToken(user)

		res.cookie("token", token, { httpOnly: true })

		res.status(200).json({ token })
	} catch (error) {
		console.error("Login error:", error)
		res.status(500).json({ message: "Internal server error" })
	}
}

module.exports = adminLogin
