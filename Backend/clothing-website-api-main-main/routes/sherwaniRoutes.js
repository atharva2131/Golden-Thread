const express = require('express');
const {
  getAllSherwanis,
  getSherwaniById,
  addSherwani,
  updateSherwani,
  deleteSherwani,
} = require('../controllers/sherwaniController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllSherwanis); // Get all sherwanis
router.get('/:id', getSherwaniById); // Get a specific sherwani
router.post('/', upload.single('image'), addSherwani); // Add a new sherwani with image upload
router.put('/:id', upload.single('image'), updateSherwani); // Update a sherwani with optional image upload
router.delete('/:id', deleteSherwani); // Delete a sherwani

module.exports = router;
