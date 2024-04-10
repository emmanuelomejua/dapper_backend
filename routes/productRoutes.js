const express = require("express");

const { uploadImage, productImageResize } = require("../middleware/multer");
const controllers = require("../controllers");
const productController = controllers.productController;
const { authAdmin } = require("../middleware/authAdmin");

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/filter/:category", productController.filterProducts);
router.post("/upload", authAdmin, productController.productUpload);
router.put(
  "/upload-images/:id",
  authAdmin,
  uploadImage.array("images", 5),
  productImageResize,
  productController.productImagesUpload
);
router.put("/edit/:id", authAdmin, productController.editProduct);
router.delete("/delete/:id", authAdmin, productController.deleteProduct);

module.exports = router;
