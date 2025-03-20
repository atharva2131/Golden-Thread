const express = require('express');
const { getCollectionNames } = require('../controllers/collectionController');

const router = express.Router();

router.get('/names', getCollectionNames); // Endpoint to get collection names

module.exports = router;
