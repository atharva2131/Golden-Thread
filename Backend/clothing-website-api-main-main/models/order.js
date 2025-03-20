const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
    products: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        totalPrice: { type: Number, required: true },
    }],
    totalAmount: { type: Number, required: true },
    customer: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected', 'shipped']
    },
    orderNumber: {
        type: String,
        required: true,
        unique: true, // Ensure order number is unique
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Export the Order model
module.exports = mongoose.model('Order', orderSchema);
