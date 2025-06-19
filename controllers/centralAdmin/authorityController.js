const schema = require('../../models/centralAdmin/authorityModel');

exports.addAuthority = async (req, res) => {
  try {
    const Authority = req.db.model('Authority', schema);
    const { approvalType, authority, programsCovered, validUntil } = req.body;

    const newAuthority = new Authority({
      approvalType,
      authority,
      programsCovered,
      validUntil,
    });

    await newAuthority.save();

    res.status(201).json({ status: true, message: 'Authority added successfully', data: newAuthority });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to add authority', error: err.message });
  }
};

exports.getAuthorities = async (req, res) => {
  try {
    const Authority = req.db.model('Authority', schema);
    const data = await Authority.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to fetch authorities', error: err.message });
  }
};

exports.updateAuthority = async (req, res) => {
  try {
    const Authority = req.db.model('Authority', schema);
    const { id } = req.params;
    const { approvalType, authority, programsCovered, validUntil } = req.body;

    const updated = await Authority.findByIdAndUpdate(
      id,
      { approvalType, authority, programsCovered, validUntil },
      { new: true }
    );

    if (!updated) return res.status(404).json({ status: false, message: 'Authority not found' });

    res.status(200).json({ status: true, message: 'Authority updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to update authority', error: err.message });
  }
};

exports.deleteAuthority = async (req, res) => {
  try {
    const Authority = req.db.model('Authority', schema);
    const { id } = req.params;

    const deleted = await Authority.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ status: false, message: 'Authority not found' });

    res.status(200).json({ status: true, message: 'Authority deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Failed to delete authority', error: err.message });
  }
};
