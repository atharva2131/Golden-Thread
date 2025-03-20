const Kurta = require('../models/Kurta');

// Get all kurtas
exports.getAllKurtas = async (req, res, next) => {
  try {
    const kurtas = await Kurta.find();
    res.status(200).json(kurtas);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific kurta by ID
exports.getKurtaById = async (req, res, next) => {
  try {
    const kurta = await Kurta.findById(req.params.id);
    if (!kurta) {
      return res.status(404).json({ message: 'Kurta not found' });
    }
    res.status(200).json(kurta);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

exports.addKurta = async (req, res, next) => {
  try {
    const { name, price, url, description } = req.body;

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const kurta = new Kurta({
      name,
      price,
      image: imagePath,
      url,
      description,
    });

    const savedKurta = await kurta.save();
    res.status(201).json(savedKurta);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Update a kurta by ID, including optional image update
exports.updateKurta = async (req, res, next) => {
  try {
    const { name, price, url, description } = req.body;
    if (!name || !price || !description) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const updatedData = {
      name,
      price,
      url,
      description,
    };

    if (imagePath) {
      updatedData.image = imagePath;
    }

    const updatedKurta = await Kurta.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedKurta) {
      return res.status(404).json({ message: 'Kurta not found' });
    }
    res.status(200).json(updatedKurta);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Delete a kurta by ID
exports.deleteKurta = async (req, res, next) => {
  try {
    const kurta = await Kurta.findByIdAndDelete(req.params.id);
    if (!kurta) {
      return res.status(404).json({ message: 'Kurta not found' });
    }
    res.status(200).json({ message: 'Kurta deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
