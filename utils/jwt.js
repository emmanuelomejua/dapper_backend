// Verify and decode a JWT to extract the payload
const jwt = require("jsonwebtoken");

const verifyToken = async (generatedToken) => {
  return jwt.verify(generatedToken, "IIVSIUVISUBCIBUIWVFYUVWVY");
};

module.exports = { verifyToken };