const crypto = require("crypto");
require("dotenv").config(); //
const jwtSecret = crypto.randomBytes(32).toString("hex");
const jwtExpiresIn = process.env.jwtExpiresIn;
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
