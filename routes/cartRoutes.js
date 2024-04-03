const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const cartController = controllers.cartController;

// POST request to add a product to the cart
router.post("/add", cartController.addToCart);

// GET request to fetch the user's cart
router.get("/:userId", cartController.getCartByUserId);

// DELETE request to remove a product from the cart
router.delete("/remove", cartController.removeFromCart);

module.exports = router;