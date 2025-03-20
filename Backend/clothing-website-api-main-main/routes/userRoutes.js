const express = require('express');
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser); // Register a new user
router.post('/login', loginUser); // Login a user
router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get a specific user by ID
router.put('/:id', updateUser); // Update user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

module.exports = router;
