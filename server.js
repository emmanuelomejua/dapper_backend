const express = require("express");
const bodyParser = require("body-parser");
const dbConnect = require("./config/db");
const productRouter = require("./routes/productRouter");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dbConnect();

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
