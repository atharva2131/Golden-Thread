const Jacket = require('../models/Jacket');

// Get all jackets
exports.getAllJackets = async (req, res, next) => {
  try {
    const jackets = await Jacket.find();
    res.status(200).json(jackets);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific jacket by ID
exports.getJacketById = async (req, res, next) => {
  try {
    const jacket = await Jacket.findById(req.params.id);
    if (!jacket) {
      return res.status(404).json({ message: 'Jacket not found' });
    }
    res.status(200).json(jacket);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Add a new jacket with image upload
exports.addJacket = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const jacket = new Jacket({
      name,
      price,
      image: imagePath,
      description,
    });

    const savedJacket = await jacket.save();
    res.status(201).json(savedJacket);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Update a jacket by ID, including optional image update
exports.updateJacket = async (req, res, next) => {
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

    const updatedJacket = await Jacket.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedJacket) {
      return res.status(404).json({ message: 'Jacket not found' });
    }
    res.status(200).json(updatedJacket);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Delete a jacket by ID
exports.deleteJacket = async (req, res, next) => {
  try {
    const jacket = await Jacket.findByIdAndDelete(req.params.id);
    if (!jacket) {
      return res.status(404).json({ message: 'Jacket not found' });
    }
    res.status(200).json({ message: 'Jacket deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
