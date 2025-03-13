const Food = require('../models/Food');
const { Op } = require('sequelize');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'food_images',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage });

exports.upload = upload;

exports.getFoods = async (req, res) => {
  try {
    // const { adminId, name } = req.query;

    // if (!adminId) {
    //   return res.status(400).json({ error: 'adminId query parameter is required' });
    // }

    // const whereClause = { adminId };
    // if (name) {
    //   whereClause.name = { [Op.iLike]: `%${name}%` };
    // }

    const foods = await Food.findAll();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addFood = async (req, res) => {
  try {
    const { name, price, description, adminId,restaurantName } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required.' });
    }

    const imageUrl = req.file.path;

    if (!adminId) {
      return res.status(400).json({ error: 'adminId is required.' });
    }

    const newFood = await Food.create({
      name,
      price,
      description,
      imageUrl,
      adminId: parseInt(adminId, 10),
      restaurantName,
      

    });

    // return foodControlerMapper(newFood)
    res.status(201).json({ message: 'Food added successfully', food: newFood });
  } catch (error) {
    console.error('Error adding food:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const foodId = req.params.id;
    const result = await Food.destroy({ where: { id: foodId } });

    if (!result) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
