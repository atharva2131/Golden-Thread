const CoordSet = require('../models/CoordSet');

// Get all coord sets
exports.getAllCoordSets = async (req, res, next) => {
  try {
    const coordSets = await CoordSet.find();
    res.status(200).json(coordSets);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific coord set by ID
exports.getCoordSetById = async (req, res, next) => {
  try {
    const coordSet = await CoordSet.findById(req.params.id);
    if (!coordSet) {
      return res.status(404).json({ message: 'Coord set not found' });
    }
    res.status(200).json(coordSet);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Add a new coord set with image upload
exports.addCoordSet = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;

    // Dynamically get the server's base URL
    const serverBaseUrl = `${req.protocol}://${req.get('host')}`;
    const imagePath = req.file ? `${serverBaseUrl}/uploads/${req.file.filename}` : null;

    const coordSet = new CoordSet({
      name,
      price,
      image: imagePath,
      description,
    });

    const savedCoordSet = await coordSet.save();
    res.status(201).json(savedCoordSet);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Update a coord set by ID, including optional image update
exports.updateCoordSet = async (req, res, next) => {
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

    const updatedCoordSet = await CoordSet.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedCoordSet) {
      return res.status(404).json({ message: 'Coord set not found' });
    }
    res.status(200).json(updatedCoordSet);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Delete a coord set by ID
exports.deleteCoordSet = async (req, res, next) => {
  try {
    const coordSet = await CoordSet.findByIdAndDelete(req.params.id);
    if (!coordSet) {
      return res.status(404).json({ message: 'Coord set not found' });
    }
    res.status(200).json({ message: 'Coord set deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
