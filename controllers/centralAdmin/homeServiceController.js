const homeServiceSchema = require('../../models/centralAdmin/HomeService');

// Add
exports.addHomeService = async (req, res) => {
  try {
    const HomeService = req.db.model('HomeService', homeServiceSchema);

    const { heading, icon, paragraph } = req.body;

    const newService = new HomeService({
      heading,
      icon,
      paragraph,
    });

    await newService.save();

    res.status(201).json({
      status: true,
      message: 'Home service added successfully',
      data: newService,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to add home service',
      error: error.message,
    });
  }
};

// Get
exports.getHomeServices = async (req, res) => {
  try {
    const HomeService = req.db.model('HomeService', homeServiceSchema);

    const services = await HomeService.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Home services fetched successfully',
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch home services',
      error: error.message,
    });
  }
};

// Update
exports.updateHomeService = async (req, res) => {
  try {
    const HomeService = req.db.model('HomeService', homeServiceSchema);

    const { heading, icon, paragraph } = req.body;

    const updated = await HomeService.findByIdAndUpdate(
      req.params.id,
      { heading, icon, paragraph },
      { new: true }
    );

    res.json({
      status: true,
      message: 'Home service updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update home service',
      error: error.message,
    });
  }
};

// Delete
exports.deleteHomeService = async (req, res) => {
  try {
    const HomeService = req.db.model('HomeService', homeServiceSchema);
    await HomeService.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: 'Home service deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete home service',
      error: error.message,
    });
  }
};
