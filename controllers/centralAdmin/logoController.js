const logoSchema = require('../../models/centralAdmin/logo');

exports.addLogo = async (req, res) => {
  try {
    const Logo = req.db.model('Logo', logoSchema);

    const existing = await Logo.findOne();
    if (existing) {
      return res.status(400).json({ status: false, message: 'Logo already exists. Please update instead.' });
    }

    const logo = req.file?.path;
    if (!logo) return res.status(400).json({ status: false, message: 'Logo file is required' });

    const newLogo = new Logo({ logo });
    await newLogo.save();

    res.status(201).json({
      status: true,
      message: 'Logo uploaded successfully',
      data: newLogo
    });
  } catch (err) {
    console.error('Error uploading logo:', err);
    res.status(500).json({ status: false, message: 'Failed to upload logo', error: err.message });
  }
};

exports.getLogo = async (req, res) => {
  try {
    const Logo = req.db.model('Logo', logoSchema);
    const logo = await Logo.findOne().sort({ createdAt: -1 });

    res.status(200).json({ status: true, data: logo });
  } catch (err) {
    console.error('Error fetching logo:', err);
    res.status(500).json({ status: false, message: 'Failed to fetch logo', error: err.message });
  }
};

exports.updateLogo = async (req, res) => {
  try {
    const Logo = req.db.model('Logo', logoSchema);
    const { id } = req.params;
    const logo = req.file?.path;

    const existing = await Logo.findById(id);
    if (!existing) {
      return res.status(404).json({ status: false, message: 'Logo not found' });
    }

    if (logo) existing.logo = logo;
    await existing.save();

    res.status(200).json({
      status: true,
      message: 'Logo updated successfully',
      data: existing
    });
  } catch (err) {
    console.error('Error updating logo:', err);
    res.status(500).json({ status: false, message: 'Failed to update logo', error: err.message });
  }
};

exports.deleteLogo = async (req, res) => {
  try {
    const Logo = req.db.model('Logo', logoSchema);
    const { id } = req.params;

    const deleted = await Logo.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ status: false, message: 'Logo not found' });

    res.status(200).json({ status: true, message: 'Logo deleted successfully' });
  } catch (err) {
    console.error('Error deleting logo:', err);
    res.status(500).json({ status: false, message: 'Failed to delete logo', error: err.message });
  }
};
