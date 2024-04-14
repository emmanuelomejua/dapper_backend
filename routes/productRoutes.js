const express = require("express")

const { uploadImage, productImageResize } = require("../middlewares/multer")

const controllers = require("../controllers")
const productController = controllers.productController

const { getProducts, filterProducts, productUpload, productImagesUpload, deleteProduct, editProduct } =
	productController
const { authAdmin } = require("../middlewares/authAdmin")

const productRouter = express.Router()

productRouter.get("/", getProducts)
productRouter.get("/filter/:category", filterProducts)
productRouter.post("/upload", authAdmin, productUpload)
productRouter.put(
	"/upload-images/:id",
	authAdmin,
	uploadImage.array("images", 5),
	productImageResize,
	productImagesUpload
)
productRouter.put("/edit/:id", authAdmin, editProduct)
productRouter.delete("/delete/:id", authAdmin, deleteProduct)

module.exports = router
