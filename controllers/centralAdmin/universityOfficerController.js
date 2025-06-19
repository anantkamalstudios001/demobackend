const universityOfficerSchema = require('../../models/centralAdmin/universityOfficer.model');

exports.addUniversityOfficers = async (req, res) => {
  try {
    const UniversityOfficer = req.db.model('UniversityOfficer', universityOfficerSchema);
    const { heading, paragraph } = req.body;
    const files = req.files;

    // 🔧 Parse officers array properly from JSON string
    const parsedOfficers = JSON.parse(req.body.officers || '[]');

    const officers = parsedOfficers.map((officer, i) => {
      const profileFile = files?.find(f => f.fieldname === `officers[${i}][profile]`);
      return {
        name: officer.name,
        designation: officer.designation,
        roleOrDepartment: officer.roleOrDepartment,
        profile: profileFile ? profileFile.path : ''
      };
    });

    const newEntry = new UniversityOfficer({ heading, paragraph, officers });
    await newEntry.save();

    res.status(201).json({ status: true, message: 'University officers added', data: newEntry });
  } catch (err) {
    console.error('Error in addUniversityOfficers:', err);
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};

// ✅ universityOfficerController.js

// GET All University Officers
exports.getUniversityOfficers = async (req, res) => {
  try {
    const UniversityOfficer = req.db.model('UniversityOfficer', universityOfficerSchema);
    const data = await UniversityOfficer.find();
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error', error: error.message });
  }
};

// UPDATE University Officers
exports.updateUniversityOfficers = async (req, res) => {
  try {
    const UniversityOfficer = req.db.model('UniversityOfficer', universityOfficerSchema); // move this up

    const id = req.params.id;
    const { heading, paragraph } = req.body;
    const files = req.files;

    const officersRaw = JSON.parse(req.body.officers || '[]');
    const officers = officersRaw.map((off, i) => {
      const profileFile = files?.find(f => f.fieldname === `officers[${i}][profile]`);
      return {
        name: off.name,
        designation: off.designation,
        roleOrDepartment: off.roleOrDepartment,
        profile: profileFile ? profileFile.path.replace(/\\/g, '/') : off.profile || ''
      };
    });

    const updated = await UniversityOfficer.findByIdAndUpdate(
      id,
      { heading, paragraph, officers },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, message: 'No record found with that ID' });
    }

    res.status(200).json({ status: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error', error: error.message });
  }
};


// DELETE University Officer by ID
exports.deleteUniversityOfficer = async (req, res) => {
  try {
    const id = req.params.id;
    const UniversityOfficer = req.db.model('UniversityOfficer', universityOfficerSchema);
    const deleted = await UniversityOfficer.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: 'Deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error', error: error.message });
  }
};