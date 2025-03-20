const express = require('express');
const {
  getAllKurtas,
  getKurtaById,
  addKurta,
  updateKurta,
  deleteKurta,
} = require('../controllers/kurtaController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllKurtas); // Get all kurtas
router.get('/:id', getKurtaById); // Get a specific kurta
router.post('/', upload.single('image'), addKurta); // Add a new kurta with image upload
router.put('/:id', upload.single('image'), updateKurta); // Update a kurta with optional image upload
router.delete('/:id', deleteKurta); // Delete a kurta

module.exports = router;
