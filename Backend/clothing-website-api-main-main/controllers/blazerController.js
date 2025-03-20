const Blazer = require('../models/blazer');

// Get all blazers
exports.getAllBlazers = async (req, res, next) => {
  try {
    const blazers = await Blazer.find();
    res.status(200).json(blazers);
  } catch (error) {
    next(error);
  }
};

// Get a specific blazer by ID
exports.getBlazerById = async (req, res, next) => {
  try {
    const blazer = await Blazer.findById(req.params.id);
    if (!blazer) {
      return res.status(404).json({ message: 'Blazer not found' });
    }
    res.status(200).json(blazer);
  } catch (error) {
    next(error);
  }
};

// Add a new blazer with image upload
exports.addBlazer = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const blazer = new Blazer({
      name,
      price,
      image: imagePath,
      description,
    });

    const savedBlazer = await blazer.save();
    res.status(201).json(savedBlazer);
  } catch (error) {
    next(error);
  }
};


exports.updateBlazer = async (req, res, next) => {
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

    const updatedBlazer = await Blazer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedBlazer) {
      return res.status(404).json({ message: 'Blazer not found' });
    }
    res.status(200).json(updatedBlazer);
  } catch (error) {
    next(error);
  }
};


// Delete a blazer by ID
exports.deleteBlazer = async (req, res, next) => {
  try {
    const blazer = await Blazer.findByIdAndDelete(req.params.id);
    if (!blazer) {
      return res.status(404).json({ message: 'Blazer not found' });
    }
    res.status(200).json({ message: 'Blazer deleted' });
  } catch (error) {
    next(error);
  }
};
