const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors"); // Import CORS middleware
const config = require("./config/config");

dotenv.config();
const app = express();
const uri = config.DB_URL;
const Port = config.PORT_NUMBER;

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(Port, () => {
      console.log(`Server running on port ${Port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Middleware and route setup
app.use(express.json());
app.use(cors()); // Use CORS middleware for all routes
app.use("/auth", authRoutes);
