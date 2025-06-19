const boardManagementSchema = require('../../models/centralAdmin/boardManagement');

exports.addBoardManagement = async (req, res) => {
  try {
    const BoardManagement = req.db.model('BoardManagement', boardManagementSchema);
    const { heading, paragraph, management } = req.body;

    const parsedManagement = [];

    if (Array.isArray(management)) {
      parsedManagement.push(
        ...management.map((m, i) => {
          const fileObj = req.files?.find(f => f.fieldname === `management[${i}][profile]`);
          return {
            designation: m.designation,
            name: m.name,
            roleOrDepartment: m.roleOrDepartment,
            profile: fileObj ? fileObj.path.replace(/\\/g, '/') : ''
          };
        })
      );
    }

    const newEntry = new BoardManagement({
      heading,
      paragraph,
      management: parsedManagement,
    });

    await newEntry.save();

    res.status(201).json({ status: true, message: 'Board of Management added', data: newEntry });
  } catch (err) {
    console.error('Error in addBoardManagement:', err);
    res.status(500).json({ status: false, message: 'Server Error', error: err.message });
  }
};







exports.getBoardManagement = async (req, res) => {
  try {
    const BoardManagement = req.db.model('BoardManagement', boardManagementSchema);
    const data = await BoardManagement.find();
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.updateBoardManagement = async (req, res) => {
  try {
    const id = req.params.id;
    const BoardManagement = req.db.model('BoardManagement', boardManagementSchema);

    const { heading, paragraph } = req.body;
    const parsedManagement = [];

    let index = 0;

    // Dynamically parse member data from FormData
    while (req.body[`management[${index}][name]`] !== undefined) {
      const file = req.files?.find(f => f.fieldname === `management[${index}][profile]`);

      parsedManagement.push({
        designation: req.body[`management[${index}][designation]`],
        name: req.body[`management[${index}][name]`],
        roleOrDepartment: req.body[`management[${index}][roleOrDepartment]`],
        profile: file ? file.path.replace(/\\/g, '/') : req.body[`management[${index}][existingProfile]`] || ''
      });

      index++;
    }

    const updated = await BoardManagement.findByIdAndUpdate(
      id,
      { heading, paragraph, management: parsedManagement },
      { new: true }
    );

    res.status(200).json({ status: true, message: 'Updated successfully', data: updated });
  } catch (err) {
    console.error('Update Error:', err);
    res.status(500).json({ status: false, error: err.message });
  }
};


exports.deleteBoardManagement = async (req, res) => {
  try {
    const id = req.params.id;
    const BoardManagement = req.db.model('BoardManagement', boardManagementSchema);
    const deleted = await BoardManagement.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: 'Deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

