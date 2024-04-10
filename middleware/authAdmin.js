const User = require("../models/user");
const { verifyToken } = require("../utils/jwt");

// Authenticate user based on JWT token in request headers
const authAdmin = async (req, res, next) => {
  // const token = req.cookies.token;
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "UNAUTHORIZED" });
  }
  try {
    const decoded = await verifyToken(token);
    const { email } = decoded;
    req.user_email = email;
    const user = await User.findOne({ email: req.user_email });
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "YOU ARE NOT ALLOWED TO CARRY OUT THIS ACTION" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({ message: "INVALID TOKEN" });
  }
};

module.exports = { authAdmin };
