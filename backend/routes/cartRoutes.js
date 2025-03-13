const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Food = require("../models/Food");

// ✅ Get Cart Items
router.get("/:userId", async (req, res) => {
  try {
    const cartItems = await Cart.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Food, as: "Food", attributes: ["name", "price", "imageUrl", "description"] }],
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Add to Cart (If exists, increase quantity)
router.post("/add", async (req, res) => {
  try {
    const { userId, foodId } = req.body;

    const foodExists = await Food.findByPk(foodId);
    if (!foodExists) return res.status(404).json({ error: "Food item not found" });

    // ✅ Check if item already in cart
    const cartItem = await Cart.findOne({ where: { userId, foodId } });

    if (cartItem) {
      // ✅ If exists, increase quantity
      await cartItem.update({ quantity: cartItem.quantity + 1 });
      return res.json({ message: "Quantity updated", cartItem });
    } else {
      // ✅ If not, create a new entry
      const newCartItem = await Cart.create({ userId, foodId, quantity: 1 });
      return res.status(201).json({ message: "Item added to cart", cartItem: newCartItem });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Update Cart Quantity
router.put("/update", async (req, res) => {
  console.log("Received update request:", req.body); // ✅ Debugging log

  let { cartId, quantity } = req.body;

  quantity = Number(quantity); // ✅ Ensure it's a number

  if (!cartId || isNaN(quantity) || quantity < 1) {
    return res.status(400).json({ error: "Invalid cartId or quantity" });
  }

  const cartItem = await Cart.findByPk(cartId);
  if (!cartItem) return res.status(404).json({ error: "Cart item not found" });

  cartItem.quantity = quantity;
  await cartItem.save();

  res.json({ message: "Quantity updated successfully!", cartItem });
});




// ✅ Remove Item from Cart
router.delete("/remove/:id", async (req, res) => {
  try {
    const result = await Cart.destroy({ where: { id: req.params.id } });
    if (!result) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
