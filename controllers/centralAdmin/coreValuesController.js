const coreValuesSchema = require('../../models/centralAdmin/coreValuesModel');

exports.addCoreValues = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    const CoreValue = req.db.model('CoreValue',coreValuesSchema);

    const newValue = new CoreValue({ heading, paragraph });
    await newValue.save();

    res.status(201).json({
      status: true,
      message: 'Core value added successfully',
      data: newValue,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.getCoreValue = async (req, res) => {
  try {
    const CoreValue = req.db.model('CoreValue',coreValuesSchema);
    const values = await CoreValue.find().sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: values });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.updateCoreValue = async (req, res) => {
  try {
    const CoreValue = req.db.model('CoreValue',coreValuesSchema);
    const { heading, paragraph } = req.body;

    const updated = await CoreValue.findByIdAndUpdate(
      req.params.id,
      { heading, paragraph },
      { new: true }
    );

    res.json({ status: true, message: 'Core value updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.deleteCoreValue = async (req, res) => {
  try {
    const CoreValue = req.db.model('CoreValue',coreValuesSchema);
    await CoreValue.findByIdAndDelete(req.params.id);

    res.json({ status: true, message: 'Core value deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
