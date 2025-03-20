const mongoose = require('mongoose');

// Get all collection names
exports.getCollectionNames = async (req, res, next) => {
  try {
    const collections = await mongoose.connection.db.listCollections().toArray();
    const collectionNames = collections.map((collection) => collection.name);
    res.status(200).json(collectionNames);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
