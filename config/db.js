const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

function dbConnect() {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Database Error");
    throw new Error(error);
  }
}

module.exports = dbConnect;
