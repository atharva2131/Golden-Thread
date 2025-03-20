const express = require('express');
const {
  getAllLehengas,
  getLehengaById,
  addLehenga,
  updateLehenga,
  deleteLehenga,
} = require('../controllers/lehengaController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllLehengas); // Get all lehengas
router.get('/:id', getLehengaById); // Get a specific lehenga
router.post('/', upload.single('image'), addLehenga); // Add a new lehenga with image upload
router.put('/:id', upload.single('image'), updateLehenga); // Update a lehenga with optional image upload
router.delete('/:id', deleteLehenga); // Delete a lehenga

module.exports = router;
