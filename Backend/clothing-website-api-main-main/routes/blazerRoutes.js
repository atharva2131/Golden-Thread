const express = require('express');
const {
  getAllBlazers,
  getBlazerById,
  addBlazer,
  updateBlazer,
  deleteBlazer,
} = require('../controllers/blazerController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllBlazers); // Get all blazers
router.get('/:id', getBlazerById); // Get a specific blazer
router.post('/', upload.single('image'), addBlazer); // Add a new blazer with image upload
router.put('/:id', upload.single('image'), updateBlazer); // Update a blazer with optional image upload
router.delete('/:id', deleteBlazer); // Delete a blazer

module.exports = router;
