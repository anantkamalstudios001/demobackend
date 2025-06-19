const mouSchema = require('../../models/centralAdmin/mou.model');

exports.addMoU = async (req, res) => {
  try {
    const MoU = req.db.model('MoU', mouSchema);
    const saved = await new MoU(req.body).save();
    res.status(201).json({ status: true, message: 'MoU saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

exports.getMoUs = async (req, res) => {
  try {
    const MoU = req.db.model('MoU', mouSchema);
    const data = await MoU.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, error: err.message });
  }
};

exports.updateMoU = async (req, res) => {
  try {
    const MoU = req.db.model('MoU', mouSchema);
    const updated = await MoU.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: true, message: 'MoU updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteMoU = async (req, res) => {
  try {
    const MoU = req.db.model('MoU', mouSchema);
    await MoU.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'MoU deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
