const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController'); // Import the correct controller

// Route to get all orders
router.get('/', orderController.getAllOrders);

// Route to update the status of an order
router.put('/:orderId', orderController.updateOrderStatus);

// Route to create a new order
router.post('/', orderController.createOrder);

// Route to delete an order
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
