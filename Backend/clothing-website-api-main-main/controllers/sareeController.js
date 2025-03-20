const Saree = require('../models/Saree');

// Get all sarees
exports.getAllSarees = async (req, res, next) => {
  try {
    const sarees = await Saree.find();
    res.status(200).json(sarees);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific saree by ID
exports.getSareeById = async (req, res, next) => {
  try {
    const saree = await Saree.findById(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }
    res.status(200).json(saree);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Add a new saree with image upload
exports.addSaree = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const saree = new Saree({
      name,
      price,
      image: imagePath,
      description,
    });

    const savedSaree = await saree.save();
    res.status(201).json(savedSaree);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Update a saree by ID, including optional image update
exports.updateSaree = async (req, res, next) => {
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

    const updatedSaree = await Saree.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedSaree) {
      return res.status(404).json({ message: 'Saree not found' });
    }
    res.status(200).json(updatedSaree);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

  

// Delete a saree by ID
exports.deleteSaree = async (req, res, next) => {
  try {
    const saree = await Saree.findByIdAndDelete(req.params.id);
    if (!saree) {
      return res.status(404).json({ message: 'Saree not found' });
    }
    res.status(200).json({ message: 'Saree deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
