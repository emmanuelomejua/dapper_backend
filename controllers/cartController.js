const Cart = require("./models/Cart"); // Assuming the Cart model is defined in a separate file

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body; // Assuming userId, productId, and quantity are passed from the frontend request body
    let cart = await Cart.findOne({ user: userId });

    // If the user doesn't have a cart, create a new one
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }],
      });
    } else {
      // If the product is already in the cart, update its quantity
      const productIndex = cart.products.findIndex(
        (item) => item.product === productId
      );
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        // Otherwise, add the product to the cart
        cart.products.push({ product: productId, quantity });
      }
    }

    // Save the cart to the database
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Error adding to cart" });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId; // Assuming userId is passed as a route parameter
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Error fetching cart" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body; // Assuming userId and productId are passed from the frontend request body
    let cart = await Cart.findOne({ user: userId });

    // If the user has a cart, remove the product
    if (cart) {
      cart.products = cart.products.filter(
        (item) => item.product.toString() !== productId
      );
      await cart.save();
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Error removing from cart" });
  }
};

module.exports = {
  addToCart,
  getCartByUserId,
  removeFromCart,
};
