// Verify and decode a JWT to extract the payload
const config = require("../config/config");
const jwt = require("jsonwebtoken");

const verifyToken = async (generatedToken) => {
  return jwt.verify(generatedToken, config.jwtSecret);
};

module.exports = { verifyToken };
