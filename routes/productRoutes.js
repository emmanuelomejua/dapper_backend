const express = require("express");

const { uploadImage, productImageResize } = require("../middleware/multer");
const {
  getProducts,
  filterProducts,
  productUpload,
  productImagesUpload,
  deleteProduct,
  editProduct,
} = require("../controllers/ProductsCtrl");
const { authAdmin } = require("../middleware/authAdmin");

const productRouter = express.Router();

productRouter.get("/", getProducts);
productRouter.get("/filter/:category", filterProducts);
productRouter.post("/upload", authAdmin, productUpload);
productRouter.put(
  "/upload-images/:id",
  authAdmin,
  uploadImage.array("images", 5),
  productImageResize,
  productImagesUpload
);
productRouter.put("/edit/:id", authAdmin, editProduct);
productRouter.delete("/delete/:id", authAdmin, deleteProduct);

module.exports = productRouter;
