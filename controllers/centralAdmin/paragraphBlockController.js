const paragraphBlockSchema = require('../../models/centralAdmin/doculist.model');

exports.addParagraphBlock = async (req, res) => {
  try {
    const ParagraphBlock = req.db.model('ParagraphBlock', paragraphBlockSchema);
    const { heading, paragraphs } = req.body;
    const saved = await new ParagraphBlock({ heading, paragraphs }).save();
    res.status(201).json({ status: true, message: 'Block saved', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};

exports.getParagraphBlocks = async (req, res) => {
  try {
    const ParagraphBlock = req.db.model('ParagraphBlock', paragraphBlockSchema);
    const list = await ParagraphBlock.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: list });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateParagraphBlock = async (req, res) => {
  try {
    const ParagraphBlock = req.db.model('ParagraphBlock', paragraphBlockSchema);
    const updated = await ParagraphBlock.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'Block updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteParagraphBlock = async (req, res) => {
  try {
    const ParagraphBlock = req.db.model('ParagraphBlock', paragraphBlockSchema);
    await ParagraphBlock.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Block deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
