const User = require('../models/user');       // User collection
const Blazer = require('../models/blazer');  // Blazers collection
const Sherwani = require('../models/Sherwani');
const Kurta = require('../models/Kurta');
const BridalWear = require('../models/bridalWear');
const Jackets = require('../models/Jacket');
const Coordsets = require('../models/CoordSet');
const Saree = require('../models/Saree');
const Lehenga = require('../models/lehenga');
const Order = require('../models/Order');
// Add other product models as needed

const getDashboardStats = async (req, res) => {
    try {
        // Fetch counts for user collection
        const totalUsers = await User.countDocuments()  ;
        const totalOrders = await Order.countDocuments() ;

        // Fetch counts for all product collections concurrently
        const productCounts = await Promise.all([
            Blazer.countDocuments(),
            Sherwani.countDocuments(),
            Kurta.countDocuments(),
            BridalWear.countDocuments(),
            Jackets.countDocuments(),
            Coordsets.countDocuments(),
            Saree.countDocuments(),
            Lehenga.countDocuments(),
            // Add other product collections here
        ]);

        // Calculate the total number of products
        const totalProducts = productCounts.reduce((sum, count) => sum + count, 0);

        // Send the counts as a response
        res.status(200).json({
            totalUsers,
            totalProducts,
            totalOrders,
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Error fetching dashboard stats' });
    }
};

module.exports = { getDashboardStats };
