// controllers/centralAdmin/corporateTieupsController.js
const corporateTieupsSchema = require('../../models/centralAdmin/corporateTieups.model');



exports.addCorporateTieups = async (req, res) => {
  try {
    const CorporateTieups = req.db.model('CorporateTieups', corporateTieupsSchema);

    const { heading, paragraph, buttonText, buttonLink } = req.body;
    const bannerImage = req.files?.bannerImage?.[0]?.filename || null;

    // Parse partners array from JSON
    let partners = [];
    if (req.body.partners) {
      partners = JSON.parse(req.body.partners);
    }

    // Attach actual uploaded logos
    const partnerLogos = req.files?.partnerLogos || [];
    partners = partners.map((partner, i) => ({
      title: partner.title,
      logo: partnerLogos[i] ? partnerLogos[i].filename : ''
    }));

    // Create and save
    const saved = await new CorporateTieups({
      heading,
      paragraph,
      buttonText,
      buttonLink,
      bannerImage,
      partners
    }).save();

    res.status(201).json({ status: true, message: 'Corporate Tie-ups saved', data: saved });

  } catch (err) {
    res.status(500).json({ status: false, message: 'Save failed', error: err.message });
  }
};







exports.getCorporateTieups = async (req, res) => {
  try {
    const CorporateTieups = req.db.model('CorporateTieups', corporateTieupsSchema);
    const data = await CorporateTieups.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updateCorporateTieups = async (req, res) => {
  try {
    const CorporateTieups = req.db.model('CorporateTieups', corporateTieupsSchema);
    const { heading, paragraph, buttonText, buttonLink } = req.body;
    const bannerImage = req.files.find(f => f.fieldname === 'bannerImage')?.filename;

    const partners = [];
    req.files
      .filter(f => f.fieldname.startsWith('partners') && f.fieldname.endsWith('[logo]'))
      .forEach((file, index) => {
        const title = req.body[`partners[${index}][title]`] || '';
        partners.push({
          title,
          logo: file.filename
        });
      });

    const updateData = { heading, paragraph, buttonText, buttonLink, partners };
    if (bannerImage) updateData.bannerImage = bannerImage;

    const updated = await CorporateTieups.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ status: true, message: 'Corporate Tieups updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deleteCorporateTieups = async (req, res) => {
  try {
    const CorporateTieups = req.db.model('CorporateTieups', corporateTieupsSchema);
    const deleted = await CorporateTieups.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Corporate Tieups deleted', data: deleted });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
