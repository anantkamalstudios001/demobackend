exports.addDepartmentCard = async (req, res) => {
  try {
    const DepartmentCard = req.db.model('DepartmentCard', require('../../models/centralAdmin/DepartmentCard'));

    const { department, icon, title, description, applyLink } = req.body;

    const newCard = new DepartmentCard({ department, icon, title, description, applyLink });
    const saved = await newCard.save();

    res.status(201).json({ status: true, message: 'Card added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to save', error: err.message });
  }
};

exports.getDepartmentCards = async (req, res) => {
  try {
    const DepartmentCard = req.db.model('DepartmentCard', require('../../models/centralAdmin/DepartmentCard'));
    const cards = await DepartmentCard.find();
    res.json({ status: true, data: cards });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch', error: err.message });
  }
};

exports.updateDepartmentCard = async (req, res) => {
  try {
    const DepartmentCard = req.db.model('DepartmentCard', require('../../models/centralAdmin/DepartmentCard'));
    console.log(req.params.id, req.body);
    const updated = await DepartmentCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ status: true, message: 'Updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteDepartmentCard = async (req, res) => {
  try {
    const DepartmentCard = req.db.model('DepartmentCard', require('../../models/centralAdmin/DepartmentCard'));
    await DepartmentCard.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
