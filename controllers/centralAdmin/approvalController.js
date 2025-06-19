const path = require('path');
const fs = require('fs');
const schema = require('../../models/centralAdmin/approvalModel');

exports.addApproval = async (req, res) => {
  try {
    const Approval = req.db.model('Approval', schema);
    const { heading, paragraph } = req.body;
    const image = req.file?.filename;

    const newApproval = new Approval({ heading, paragraph, image });
    await newApproval.save();

    res.status(201).json({ status: true, message: 'Approval entry added', data: newApproval });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to add approval', error: error.message });
  }
};

exports.getApprovals = async (req, res) => {
  try {
    const Approval = req.db.model('Approval', schema);
    const data = await Approval.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to fetch approvals', error: error.message });
  }
};

exports.updateApproval = async (req, res) => {
  try {
    const Approval = req.db.model('Approval', schema);
    const { id } = req.params;
    const { heading, paragraph } = req.body;
    const image = req.file?.filename;

    const existing = await Approval.findById(id);
    if (!existing) return res.status(404).json({ status: false, message: 'Approval not found' });

    if (image && existing.image) {
      const imagePath = path.join(__dirname, '../../uploads/approvals', existing.image);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    existing.heading = heading;
    existing.paragraph = paragraph;
    if (image) existing.image = image;

    await existing.save();

    res.status(200).json({ status: true, message: 'Approval updated', data: existing });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Update failed', error: error.message });
  }
};

exports.deleteApproval = async (req, res) => {
  try {
    const Approval = req.db.model('Approval', schema);
    const { id } = req.params;

    const existing = await Approval.findById(id);
    if (!existing) return res.status(404).json({ status: false, message: 'Approval not found' });

    const imagePath = path.join(__dirname, '../../uploads/approvals', existing.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await Approval.findByIdAndDelete(id);

    res.status(200).json({ status: true, message: 'Approval deleted' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Delete failed', error: error.message });
  }
};
