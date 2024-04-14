const { verifyToken } = require("../utils/jwt.js")

const authUser = async (req, res, next) => {
	const authHeader = req.headers["authorization"]
	const token = authHeader && authHeader.split(" ")[1]

	if (!token) {
		return res.status(401).json({ message: "UNAUTHORIZED" })
	} else {
		try {
			const decoded = await verifyToken(token)
			const { email } = decoded
			req.user_email = await email
			const user = await findOne({ email: req.user_email })
			if (!user) {
				return res.status(403).json({ message: "FORBIDDEN" })
			}
			req.user = user
			next()
		} catch (error) {
			return res.status(403).json({ message: "INVALID TOKEN" })
			// next(error)
		}
	}
}

module.exports = { authUser }
