'use strict';

require("dotenv").config()


const express = require("express")
const Routes = require("./routes")
const cors = require("cors")
const config = require("./config/config");
const connectDB = require('./config/db');
const { log, error } = require('console');

const { json, urlencoded } = express;

// dotenv.config();
const app = express()
// const uri = config.DB_URL

app.use(json())
app.use(urlencoded({extended: false}))
app.use(cors())


app.use("/api/auth", Routes.authRoutes)
app.use("/api/orders", Routes.ordersRoutes)
app.use("/api/cart", Routes.cartRoutes);
app.use("/api/products", Routes.productRoutes);
app.use("/api/admin", Routes.adminRoutes);


const Port = config.PORT_NUMBER

app.listen(Port, (err) => {
	if(!err){
		connectDB()
		log(`Server started at port ${Port}`)
	} else {
		error(err)
	}
})

