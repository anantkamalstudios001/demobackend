const path = require('path');
const fs = require('fs');
const schema = require('../../models/centralAdmin/affiliationModel');

exports.addAffiliation = async (req, res) => {
  try {
    const Affiliation = req.db.model('Affiliation', schema);
    const { heading, paragraph } = req.body;
    const image = req.file?.filename;

    const newAffiliation = new Affiliation({ heading, paragraph, image });
    await newAffiliation.save();

    res.status(201).json({ status: true, message: 'Affiliation added successfully', data: newAffiliation });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to add affiliation', error: error.message });
  }
};

exports.getAffiliations = async (req, res) => {
  try {
    const Affiliation = req.db.model('Affiliation', schema);
    const data = await Affiliation.find().sort({ createdAt: -1 });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to fetch affiliations', error: error.message });
  }
};

exports.updateAffiliation = async (req, res) => {
  try {
    const Affiliation = req.db.model('Affiliation', schema);
    const { id } = req.params;
    const { heading, paragraph } = req.body;
    const image = req.file?.filename;

    const existing = await Affiliation.findById(id);
    if (!existing) return res.status(404).json({ status: false, message: 'Affiliation not found' });

    if (image && existing.image) {
      const imgPath = path.join(__dirname, '../../uploads/affiliations', existing.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    existing.heading = heading;
    existing.paragraph = paragraph;
    if (image) existing.image = image;

    await existing.save();

    res.status(200).json({ status: true, message: 'Affiliation updated', data: existing });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to update affiliation', error: error.message });
  }
};

exports.deleteAffiliation = async (req, res) => {
  try {
    const Affiliation = req.db.model('Affiliation', schema);
    const { id } = req.params;

    const record = await Affiliation.findById(id);
    if (!record) return res.status(404).json({ status: false, message: 'Affiliation not found' });

    const imgPath = path.join(__dirname, '../../uploads/affiliations', record.image);
    if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);

    await Affiliation.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: 'Affiliation deleted' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to delete affiliation', error: error.message });
  }
};
