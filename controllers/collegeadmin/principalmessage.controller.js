const PrincipalMessage = require('../../models/collegeadmin/PrincipalMessage');

exports.createMessage = async (req, res) => {
  try {
    const { title, principalName, designation, message } = req.body;

    const newMessage = new PrincipalMessage({
      title,
      principalName,
      designation,
      message
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message added', data: newMessage });
  } catch (err) {
    console.error('Error saving principal message:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
