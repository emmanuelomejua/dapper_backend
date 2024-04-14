require("dotenv").config();

// Load JWT secret from environment variable or use a default value
const jwtSecret = process.env.JWT_SECRET;
const jwtExpiresIn = process.env.JWT_EXPIRES_IN;
const CompanyemailConfig = {
  username: process.env.username,
  password: process.env.password,
};
const clientURL = process.env.clientURL;
const DB_URL = process.env.DB_URL;
const PORT_NUMBER = process.env.PORT_NUMBER;

module.exports = {
  jwtSecret,
  jwtExpiresIn,
  CompanyemailConfig,
  clientURL,
  DB_URL,
  PORT_NUMBER,
};
