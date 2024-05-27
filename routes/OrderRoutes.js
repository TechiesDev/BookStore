const express = require('express');
const router = express.Router();
const orderController = require('../controllers/OrderController');
const { isLogedIn } = require("../middleware/Authorization");

// Create a new order
router.post('/bookorder',isLogedIn, orderController.createOrder);

// Get all orders
router.get('/bookorder',isLogedIn, orderController.getAllOrders);

// Get order by ID
router.get('/bookorder/:id',isLogedIn, orderController.getOrderById);

// Update an order
router.put('/bookorder/:id', isLogedIn, orderController.updateOrder);



module.exports = router;
