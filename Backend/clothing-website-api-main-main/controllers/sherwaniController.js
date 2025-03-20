const Sherwani = require('../models/Sherwani');

// Get all sherwanis
exports.getAllSherwanis = async (req, res, next) => {
  try {
    const sherwanis = await Sherwani.find();
    res.status(200).json(sherwanis);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific sherwani by ID
exports.getSherwaniById = async (req, res, next) => {
  try {
    const sherwani = await Sherwani.findById(req.params.id);
    if (!sherwani) {
      return res.status(404).json({ message: 'Sherwani not found' });
    }
    res.status(200).json(sherwani);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

exports.addSherwani = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const sherwani = new Sherwani({
      name,
      price,
      image: imagePath,
      description,
    });

    const savedSherwani = await sherwani.save();
    res.status(201).json(savedSherwani);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Update a sherwani by ID, including optional image update
exports.updateSherwani = async (req, res, next) => {
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

    const updatedSherwani = await Sherwani.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedSherwani) {
      return res.status(404).json({ message: 'Sherwani not found' });
    }
    res.status(200).json(updatedSherwani);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Delete a sherwani by ID
exports.deleteSherwani = async (req, res, next) => {
  try {
    const sherwani = await Sherwani.findByIdAndDelete(req.params.id);
    if (!sherwani) {
      return res.status(404).json({ message: 'Sherwani not found' });
    }
    res.status(200).json({ message: 'Sherwani deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
