const express = require('express');
const {
  getAllCoordSets,
  getCoordSetById,
  addCoordSet,
  updateCoordSet,
  deleteCoordSet,
} = require('../controllers/coordSetController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllCoordSets); // Get all coord sets
router.get('/:id', getCoordSetById); // Get a specific coord set
router.post('/', upload.single('image'), addCoordSet); // Add a new coord set with image upload
router.put('/:id', upload.single('image'), updateCoordSet); // Update a coord set with optional image upload
router.delete('/:id', deleteCoordSet); // Delete a coord set

module.exports = router;
