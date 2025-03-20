const express = require('express');
const { getDashboardStats } = require('../controllers/dashboardController');

const router = express.Router();

// Define route for dashboard stats
router.get('/dash', getDashboardStats);

module.exports = router;
