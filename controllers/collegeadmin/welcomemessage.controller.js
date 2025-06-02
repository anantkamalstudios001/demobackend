const Welcome = require('../../models/collegeadmin/welcomeMessage.model');

exports.createWelcomeMessage = async (req, res) => {
  try {
    const { heading, message, isActive } = req.body;

    const welcome = new Welcome({
      heading,
      message,
      isActive
    });

    await welcome.save();
    res.status(201).json({ message: 'Welcome message created', welcome });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
