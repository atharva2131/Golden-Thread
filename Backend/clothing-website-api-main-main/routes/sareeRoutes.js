const express = require('express');
const {
  getAllSarees,
  getSareeById,
  addSaree,
  updateSaree,
  deleteSaree,
} = require('../controllers/sareeController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllSarees); // Get all sarees
router.get('/:id', getSareeById); // Get a specific saree
router.post('/', upload.single('image'), addSaree); // Add a new saree with image upload
router.put('/:id', upload.single('image'), updateSaree); // Update a saree with optional image upload
router.delete('/:id', deleteSaree); // Delete a saree

module.exports = router;
