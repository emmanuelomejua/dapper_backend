const Product = require("../model/product");
const { productValidator, editProductValidator } = require("../utils/validator");
const cloudinaryUploadImage = require("../utils/cloudinary");
const fs = require("fs");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

//Filter products by category
const filterProducts = async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category: category });
    res.status(200).json({ products: products });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

const productUpload = async (req, res) => {
  const { error, value } = productValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "Invalid Request" });
  }
  try {
    const { name } = value;
    const findProduct = await Product.findOne({ name: name });
    if (findProduct) {
      return res.status(400).json({ error: "Product Already Exists" });
    }
    const newProduct = await Product.create(value);
    res
      .status(201)
      .json({ message: "Product Created Successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

const productImagesUpload = async (req, res) => {
  const { id } = req.params;
  try {
    const uploader = (path) => cloudinaryUploadImage(path, "images"); // Pass the files array to the cloudinaryUploadImage function
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Images Uploaded Successfully", product: findProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

const editProduct = async (req, res) => {
  const { error, value } = editProductValidator.validate(req.body);
  if (error) {
    return res.status(400).json({ error: "Invalid Request" });
  }
  const { id } = req.params;
  const { name, description, price, category } = value;
  try {
    const findProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: name,
        description: description,
        price: price,
        category: category,
      },
      { new: true }
    );
    if (!findProduct) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    res
      .status(200)
      .json({ message: "Product Updated Successfully", product: findProduct });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findByIdAndDelete(id);
    if (!findProduct) {
      return res.status(404).json({ error: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.log(error.message);
  }
};

module.exports = {
  getProducts,
  productUpload,
  productImagesUpload,
  filterProducts,
  editProduct,
  deleteProduct,
};