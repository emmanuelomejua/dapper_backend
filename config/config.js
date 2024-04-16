require("dotenv").config();
const jwtSecret =
  process.env.JWT_SECRET ||
  "2baae8be9c2b22a3157a8e4be40de562893233ac3cea2390fd9217a8ef86bebf";
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
