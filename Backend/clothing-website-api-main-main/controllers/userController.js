const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.registerUser = async (req, res, next) => {
  try {
    const { name, mobilenumber, email, address, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, mobilenumber, email, address, password });
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
    res.status(200).json({ token, user });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Update a user by ID
exports.updateUser = async (req, res, next) => {
    try {
      const { name, mobilenumber, email, address, password } = req.body;
  
      // Validate required fields
      if (!name || !mobilenumber || !email || !address || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const updatedData = { name, mobilenumber, email, address, password };
  
      // Find and update user
      const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      next(error); // Pass error to centralized error handler
    }
  };
  

// Delete a user by ID
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
