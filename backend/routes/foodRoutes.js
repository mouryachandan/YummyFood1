const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');


router.get('/all', foodController.getFoods);


router.post('/add', foodController.upload.single('image'), foodController.addFood);


router.delete('/delete/:id', foodController.deleteFood);

module.exports = router;
