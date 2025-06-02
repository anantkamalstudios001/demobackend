const HomeService = require('../../models/centralAdmin/HomeService');

exports.addHomeService = async (req, res) => {
  try {
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
    console.error('Error adding home service:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to add home service',
      error: error.message,
    });
  }
};

exports.getHomeServices = async (req, res) => {
  try {
    const services = await HomeService.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Home services fetched successfully',
      data: services,
    });
  } catch (error) {
    console.error('Error fetching home services:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch home services',
      error: error.message,
    });
  }
};
