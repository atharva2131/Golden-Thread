const express = require('express');
const {
  getAllBridalWear,
  getBridalWearById,
  addBridalWear,
  updateBridalWear,
  deleteBridalWear,
} = require('../controllers/bridalWearController');
const upload = require('../middleware/upload'); // Import the upload middleware

const router = express.Router();

router.get('/', getAllBridalWear); // Get all bridal wear
router.get('/:id', getBridalWearById); // Get a specific bridal wear
router.post('/', upload.single('image'), addBridalWear); // Add new bridal wear with image upload
router.put('/:id', upload.single('image'), updateBridalWear); // Update bridal wear with optional image upload
router.delete('/:id', deleteBridalWear); // Delete bridal wear

module.exports = router;
