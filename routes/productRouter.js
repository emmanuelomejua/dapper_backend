const express = require("express");

const { uploadImage, productImageResize } = require("../middleware/multer");
const {
  getProducts,
  filterProducts,
  productUpload,
  productImagesUpload,
  deleteProduct,
  editProduct,
} = require("../controller/ProductsCtrl");

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/filter/:category", filterProducts);
productRouter.post("/upload", productUpload);
productRouter.put(
  "/upload-images/:id",
  uploadImage.array("images", 5),
  productImageResize,
  productImagesUpload
);
productRouter.put("/edit/:id", editProduct);
productRouter.delete("/delete/:id", deleteProduct);

module.exports = productRouter;
