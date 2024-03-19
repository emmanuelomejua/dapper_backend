const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
const Routes = require("./routes")
const cors = require("cors")
const config = require("./config/config")

// dotenv.config();
const app = express()
const uri = config.DB_URL
const Port = config.PORT_NUMBER

// Connect to MongoDB
mongoose
	.connect(uri)
	.then(() => {
		console.log("Connected to MongoDB")
		app.listen(Port, () => {
			console.log(`Server running on port ${Port}`)
		})
	})
	.catch((error) => {
		console.error("Error connecting to MongoDB:", error)
	})

// Middleware and route setup
app.use(express.json())
app.use(cors())
app.use("/api/auth", Routes.authRoutes)
app.use("/api/orders", Routes.ordersRoutes)
