const committeeSchema = require('../../models/centralAdmin/Committee');

exports.addCommittee = async (req, res) => {
  try {
    const Committee = req.db.model('Committee', committeeSchema);
    const { committeeDesignation, members } = req.body;

    const newCommittee = new Committee({ committeeDesignation, members });
    await newCommittee.save();

    res.status(201).json({ status: true, message: 'Committee added successfully', data: newCommittee });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to add committee', error: err.message });
  }
};

exports.getCommittees = async (req, res) => {
  try {
    const Committee = req.db.model('Committee', committeeSchema);
    const list = await Committee.find().sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: list });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch committees', error: err.message });
  }
};

exports.updateCommittee = async (req, res) => {
  try {
    const Committee = req.db.model('Committee', committeeSchema);
    const { id } = req.params;
    const { committeeDesignation, members } = req.body;

    const updated = await Committee.findByIdAndUpdate(id, { committeeDesignation, members }, { new: true });
    if (!updated) return res.status(404).json({ status: false, message: 'Committee not found' });

    res.status(200).json({ status: true, message: 'Committee updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update committee', error: err.message });
  }
};

exports.deleteCommittee = async (req, res) => {
  try {
    const Committee = req.db.model('Committee', committeeSchema);
    const { id } = req.params;

    const deleted = await Committee.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ status: false, message: 'Committee not found' });

    res.status(200).json({ status: true, message: 'Committee deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete committee', error: err.message });
  }
};
