const ourCommitteesSchema = require('../../models/centralAdmin/OurCommittees');

exports.addOurCommittees = async (req, res) => {
  try {
    const OurCommittees = req.db.model('OurCommittees', ourCommitteesSchema);

    // Support for both single and multiple documents
    const data = Array.isArray(req.body) ? req.body : [req.body];

    // Validate required fields in each entry
    for (const item of data) {
      if (!item.introParagraph || !Array.isArray(item.sections)) {
        return res.status(400).json({
          status: false,
          message: 'Each entry must contain introParagraph and sections array'
        });
      }
    }

    const createdEntries = await OurCommittees.insertMany(data);

    res.status(201).json({
      status: true,
      message: 'Our Committees content added successfully',
      data: createdEntries
    });
  } catch (err) {
    console.error('Error adding Our Committees:', err);
    res.status(500).json({
      status: false,
      message: 'Failed to add Our Committees content',
      error: err.message
    });
  }
};

exports.getOurCommittees = async (req, res) => {
  try {
    const OurCommittees = req.db.model('OurCommittees', ourCommitteesSchema);
    const entries = await OurCommittees.find().sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: entries });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch Our Committees', error: err.message });
  }
};

exports.updateOurCommittees = async (req, res) => {
  try {
    const OurCommittees = req.db.model('OurCommittees', ourCommitteesSchema);
    const { id } = req.params;
    const { introParagraph, sections } = req.body;

    const updated = await OurCommittees.findByIdAndUpdate(
      id,
      { introParagraph, sections },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ status: false, message: 'Entry not found' });

    res.status(200).json({ status: true, message: 'Our Committees updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update Our Committees', error: err.message });
  }
};

exports.deleteOurCommittees = async (req, res) => {
  try {
    const OurCommittees = req.db.model('OurCommittees', ourCommitteesSchema);
    const { id } = req.params;

    const deleted = await OurCommittees.findByIdAndDelete(id);
    if (!deleted)
      return res.status(404).json({ status: false, message: 'Entry not found' });

    res.status(200).json({ status: true, message: 'Our Committees entry deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete Our Committees', error: err.message });
  }
};
