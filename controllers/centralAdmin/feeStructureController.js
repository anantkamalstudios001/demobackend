const feeStructureSchema = require('../../models/centralAdmin/FeeStructure');

exports.addFeeStructure = async (req, res) => {
  try {
    const FeeStructure = req.db.model('FeeStructure', feeStructureSchema);

    const existing = await FeeStructure.findOne();
    if (existing) {
      return res.status(400).json({ status: false, message: 'Fee structure already exists' });
    }

    const { ugCourses, pgCourses, notes } = req.body;

    const newFee = new FeeStructure({ ugCourses, pgCourses, notes });
    await newFee.save();

    res.status(201).json({
      status: true,
      message: 'Fee structure added successfully',
      data: newFee
    });
  } catch (err) {
    console.error('Error adding fee structure:', err);
    res.status(500).json({ status: false, message: 'Failed to add fee structure', error: err.message });
  }
};

exports.getFeeStructure = async (req, res) => {
  try {
    const FeeStructure = req.db.model('FeeStructure', feeStructureSchema);
    const feeStructure = await FeeStructure.findOne().sort({ createdAt: -1 });

    res.status(200).json({
      status: true,
      message: 'Fee structure fetched successfully',
      data: feeStructure
    });
  } catch (err) {
    console.error('Error fetching fee structure:', err);
    res.status(500).json({ status: false, message: 'Failed to fetch fee structure', error: err.message });
  }
};

exports.updateFeeStructure = async (req, res) => {
  try {
    const FeeStructure = req.db.model('FeeStructure', feeStructureSchema);
    const { id } = req.params;
    const { ugCourses, pgCourses, notes } = req.body;

    const updated = await FeeStructure.findByIdAndUpdate(
      id,
      { ugCourses, pgCourses, notes },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ status: false, message: 'Fee structure not found' });
    }

    res.status(200).json({
      status: true,
      message: 'Fee structure updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Error updating fee structure:', err);
    res.status(500).json({ status: false, message: 'Failed to update fee structure', error: err.message });
  }
};

exports.deleteFeeStructure = async (req, res) => {
  try {
    const FeeStructure = req.db.model('FeeStructure', feeStructureSchema);
    const { id } = req.params;

    const deleted = await FeeStructure.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ status: false, message: 'Fee structure not found' });
    }

    res.status(200).json({ status: true, message: 'Fee structure deleted successfully' });
  } catch (err) {
    console.error('Error deleting fee structure:', err);
    res.status(500).json({ status: false, message: 'Failed to delete fee structure', error: err.message });
  }
};
