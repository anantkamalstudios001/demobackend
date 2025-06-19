const highlightedCaseSchema = require('../../models/centralAdmin/highlightedCaseModel');

exports.addHighlightedCase = async (req, res) => {
  try {
    const HighlightedCase = req.db.model('HighlightedCase', highlightedCaseSchema);
    const { heading, paragraph } = req.body;

    const newCase = new HighlightedCase({ heading, paragraph });
    await newCase.save();

    res.json({ status: true, message: 'Highlighted case added', data: newCase });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getHighlightedCases = async (req, res) => {
  try {
    const HighlightedCase = req.db.model('HighlightedCase', highlightedCaseSchema);
    const cases = await HighlightedCase.find().sort({ createdAt: -1 });

    res.json({ status: true, data: cases });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updateHighlightedCase = async (req, res) => {
  try {
    const HighlightedCase = req.db.model('HighlightedCase', highlightedCaseSchema);
    const updated = await HighlightedCase.findByIdAndUpdate(
      req.params.id,
      { heading: req.body.heading, paragraph: req.body.paragraph },
      { new: true }
    );

    res.json({ status: true, message: 'Highlighted case updated', data: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deleteHighlightedCase = async (req, res) => {
  try {
    const HighlightedCase = req.db.model('HighlightedCase', highlightedCaseSchema);
    await HighlightedCase.findByIdAndDelete(req.params.id);

    res.json({ status: true, message: 'Highlighted case deleted' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
