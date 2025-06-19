const faqSchema = require('../../models/centralAdmin/faq.model');

exports.addFaq = async (req, res) => {
  try {
    const Faq = req.db.model('Faq', faqSchema);
    console.log(req.body)
    const saved = await new Faq(req.body).save();
    res.status(201).json({ status: true, message: 'FAQ added', data: saved });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};

exports.getFaqs = async (req, res) => {
  try {
    const Faq = req.db.model('Faq', faqSchema);
    const list = await Faq.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: list });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateFaq = async (req, res) => {
  try {
    const Faq = req.db.model('Faq', faqSchema);
    const updated = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ status: true, message: 'FAQ updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteFaq = async (req, res) => {
  try {
    const Faq = req.db.model('Faq', faqSchema);
    await Faq.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'FAQ deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
