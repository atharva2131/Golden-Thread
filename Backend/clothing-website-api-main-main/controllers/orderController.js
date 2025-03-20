const Order = require('../models/Order'); // Import the model

// Generate order number
const generateOrderNumber = () => {
    return 'ORD' + Math.floor(Math.random() * 1000000); // Generates a unique order number
};

// Function to get all orders
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Failed to load orders' });
    }
};

// Function to update the status of an order
exports.updateOrderStatus = async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['pending', 'approved', 'rejected', 'shipped'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(order);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Failed to update order status' });
    }
};

// Function to create a new order
exports.createOrder = async (req, res) => {
    const { products, totalAmount, customer } = req.body;

    if (!products || !totalAmount || !customer) {
        return res.status(400).json({ message: 'Products, totalAmount, and customer are required' });
    }

    try {
        const orderNumber = generateOrderNumber(); // Generate the order number

        const newOrder = new Order({
            products,
            totalAmount,
            customer,
            status: 'pending', // default status is 'pending'
            orderNumber, // Add the order number to the order
        });

        await newOrder.save();
        res.status(201).json({ 
            message: 'Order placed successfully', 
            order: newOrder,
            orderNumber: newOrder.orderNumber // Send the order number to frontend
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ message: 'Failed to place order', error });
    }
};

// Function to delete an order
exports.deleteOrder = async (req, res) => {
    const { orderId } = req.params;

    try {
        const order = await Order.findByIdAndDelete(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ message: 'Failed to delete order' });
    }
};
