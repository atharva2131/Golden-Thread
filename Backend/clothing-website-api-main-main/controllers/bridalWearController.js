const BridalWear = require('../models/bridalWear');

// Get all bridal wear
exports.getAllBridalWear = async (req, res, next) => {
  try {
    const bridalWear = await BridalWear.find();
    res.status(200).json(bridalWear);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific bridal wear by ID
exports.getBridalWearById = async (req, res, next) => {
  try {
    const bridalWear = await BridalWear.findById(req.params.id);
    if (!bridalWear) {
      return res.status(404).json({ message: 'Bridal wear not found' });
    }
    res.status(200).json(bridalWear);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Add new bridal wear with image upload
exports.addBridalWear = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const bridalWear = new BridalWear({
      name,
      price,
      image: imagePath,
      description,
    });

    const savedBridalWear = await bridalWear.save();
    res.status(201).json(savedBridalWear);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Update bridal wear by ID
exports.updateBridalWear = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const updatedData = {
      name,
      price,
      description,
    };

    if (imagePath) {
      updatedData.image = imagePath;
    }

    const updatedBridalWear = await BridalWear.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedBridalWear) {
      return res.status(404).json({ message: 'Bridal wear not found' });
    }
    res.status(200).json(updatedBridalWear);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Delete bridal wear by ID
exports.deleteBridalWear = async (req, res, next) => {
  try {
    const bridalWear = await BridalWear.findByIdAndDelete(req.params.id);
    if (!bridalWear) {
      return res.status(404).json({ message: 'Bridal wear not found' });
    }
    res.status(200).json({ message: 'Bridal wear deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
