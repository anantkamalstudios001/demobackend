const fs = require('fs');
const boardManagementMemberSchema = require('../../models/centralAdmin/BoardManagementMember');

exports.addBoardManagementTable = async (req, res) => {
  try {
    const BoardManagementMember = req.db.model('BoardManagementMember', boardManagementMemberSchema);

    const filesMap = {};
    req.files.forEach(file => {
      filesMap[file.fieldname] = file.path;
    });

    const members = {};

    for (const key in req.body) {
      const value = req.body[key];
      const match = key.match(/^members\[(\d+)\]\[(\w+)\]$/);
      if (match) {
        const index = match[1];
        const field = match[2];
        if (!members[index]) members[index] = {};
        members[index][field] = value.toString(); // 🔑 FIX: convert to string explicitly
      }
    }

    for (const key in filesMap) {
      const match = key.match(/^members\[(\d+)\]\[image\]$/);
      if (match) {
        const index = match[1];
        if (!members[index]) members[index] = {};
        members[index].image = filesMap[key];
      }
    }

    const savedMembers = [];

    for (const index in members) {
      const data = members[index];

      // Optional: Validate before saving
      if (!data.designation || !data.name || !data.roleOrDept || !data.image) {
        console.log('Invalid data at index', index, data);
        continue;
      }

      const member = new BoardManagementMember({
        designation: data.designation,
        name: data.name,
        roleOrDept: data.roleOrDept,
        image: data.image,
      });

      const saved = await member.save();
      savedMembers.push(saved);
    }

    res.status(200).json({
      status: true,
      message: 'Board Management members added',
      data: savedMembers,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to save board management members',
      error: error.message,
    });
  }
};





exports.updateBoardManagementMember = async (req, res) => {
  try {
    const { id } = req.params;
    const BoardManagementMember = req.db.model('BoardManagementMember', boardManagementMemberSchema);

    const existingMember = await BoardManagementMember.findById(id);
    if (!existingMember) {
      return res.status(404).json({ status: false, message: 'Member not found' });
    }

    const designation = req.body.designation || existingMember.designation;
    const name = req.body.name || existingMember.name;
    const roleOrDept = req.body.roleOrDept || existingMember.roleOrDept;

    let image = existingMember.image;
    if (req.file && req.file.path) {
      if (image && fs.existsSync(image)) {
        fs.unlinkSync(image); // delete old image
      }
      image = req.file.path;
    }

    existingMember.designation = designation;
    existingMember.name = name;
    existingMember.roleOrDept = roleOrDept;
    existingMember.image = image;

    const updated = await existingMember.save();

    res.status(200).json({
      status: true,
      message: 'Member updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to update member',
      error: error.message,
    });
  }
};


exports.getBoardManagementTable = async (req, res) => {
  try {
    const BoardManagementMember = req.db.model('BoardManagementMember', boardManagementMemberSchema);
    const list = await BoardManagementMember.find().sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: list });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to fetch members', error: error.message });
  }
};

exports.deleteBoardManagementMember = async (req, res) => {
  try {
    const { id } = req.params;
    const BoardManagementMember = req.db.model('BoardManagementMember', boardManagementMemberSchema);
    const member = await BoardManagementMember.findById(id);
    if (!member) return res.status(404).json({ status: false, message: 'Member not found' });

    if (member.image) fs.unlinkSync(member.image);

    await BoardManagementMember.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: 'Member deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: 'Failed to delete member', error: err.message });
  }
};
