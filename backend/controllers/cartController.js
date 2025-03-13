const Cart = require("../models/Cart");
const Food = require("../models/Food");

// 🛒 उपयोगकर्ता की कार्ट प्राप्त करें
exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID आवश्यक है।" });
    }

    const cartItems = await Cart.findAll({
      where: { userId },
      include: [{ model: Food, as: "Food" }],
    });

    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🛍️ फ़ूड को कार्ट में जोड़ें
exports.addToCart = async (req, res) => {
  try {
    const { userId, foodId } = req.body;

    if (!userId || !foodId) {
      return res.status(400).json({ error: "UserId और FoodId आवश्यक हैं।" });
    }

    const foodExists = await Food.findByPk(foodId);
    if (!foodExists) {
      return res.status(404).json({ error: "Food item नहीं मिला।" });
    }

    const cartItem = await Cart.create({ userId, foodId });

    res.status(201).json({ message: "Cart में जोड़ा गया", cartItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🗑️ कार्ट से फ़ूड हटाएँ
exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Cart.destroy({ where: { id } });
    if (!result) return res.status(404).json({ message: "Item नहीं मिला" });

    res.json({ message: "Item हटा दिया गया" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
