const express = require('express');
const {
  getAllJackets,
  getJacketById,
  addJacket,
  updateJacket,
  deleteJacket,
} = require('../controllers/jacketController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllJackets); // Get all jackets
router.get('/:id', getJacketById); // Get a specific jacket
router.post('/', upload.single('image'), addJacket); // Add a new jacket with image upload
router.put('/:id', upload.single('image'), updateJacket); // Update a jacket with optional image upload
router.delete('/:id', deleteJacket); // Delete a jacket

module.exports = router;
