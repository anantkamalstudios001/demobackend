const getModelByDepartment = require('../../utils/getModelByDepartment');

exports.addNotice = async (req, res) => {
  try {
    const { title, category, startDate, endDate, content } = req.body;
    const department = req.headers['x-department'];

    if (!department) {
      return res.status(400).json({ message: 'Missing department header' });
    }

    const NoticeModel = getModelByDepartment(department, 'notices');

    const newNotice = new NoticeModel({
      title,
      category,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      content
    });

    await newNotice.save();

    res.status(201).json({ message: `${department} notice added successfully`, notice: newNotice });
  } catch (error) {
    console.error('Error adding notice:', error);
    res.status(500).json({ message: 'Error adding notice', error });
  }
};



exports.getNotices = async (req, res) => {
  try {
    const department = req.headers['x-department'];

    if (!department) {
      return res.status(400).json({ message: 'Missing department header' });
    }

    const NoticeModel = getModelByDepartment(department, 'notices');
    const notices = await NoticeModel.find().sort({ createdAt: -1 }); // latest first

    res.status(200).json({ message: `${department} notices fetched successfully`, notices });
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ message: 'Error fetching notices', error });
  }
};

