const Lehenga = require('../models/lehenga');

// Get all lehengas
exports.getAllLehengas = async (req, res, next) => {
  try {
    const lehengas = await Lehenga.find();
    res.status(200).json(lehengas);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

// Get a specific lehenga by ID
exports.getLehengaById = async (req, res, next) => {
  try {
    const lehenga = await Lehenga.findById(req.params.id);
    if (!lehenga) {
      return res.status(404).json({ message: 'Lehenga not found' });
    }
    res.status(200).json(lehenga);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};

exports.addLehenga = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    
    // Dynamically get the localhost with port
    const host = req.get('host');
    const imagePath = req.file ? `http://${host}/uploads/${req.file.filename}` : null;

    const lehenga = new Lehenga({
      name,
      price,
      image: imagePath,
      description,
    });

    const savedLehenga = await lehenga.save();
    res.status(201).json(savedLehenga);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


exports.updateLehenga = async (req, res, next) => {
  try {
    const { name, price, description } = req.body;
    const lehenga = await Lehenga.findById(req.params.id);
    if (!lehenga) {
      return res.status(404).json({ message: 'Lehenga not found' });
    }

    const updatedData = { name, price, description };
    if (req.file) {
      const host = req.get('host');
      updatedData.image = `http://${host}/uploads/${req.file.filename}`;
    }

    const updatedLehenga = await Lehenga.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.status(200).json(updatedLehenga);
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};


// Delete a lehenga by ID
exports.deleteLehenga = async (req, res, next) => {
  try {
    const lehenga = await Lehenga.findByIdAndDelete(req.params.id);
    if (!lehenga) {
      return res.status(404).json({ message: 'Lehenga not found' });
    }
    res.status(200).json({ message: 'Lehenga deleted' });
  } catch (error) {
    next(error); // Pass error to the centralized error handler
  }
};
