const contactDetailsSchema = require('../../models/centralAdmin/contactDetails.model');

exports.addContactDetails = async (req, res) => {
  try {
    const ContactDetails = req.db.model('ContactDetails', contactDetailsSchema);

    // ✅ Check if any contact details already exist
    const existing = await ContactDetails.findOne();
    if (existing) {
      return res.status(400).json({
        status: false,
        message: 'Contact details already exist. Please update instead.'
      });
    }

    const { address, email, phones } = req.body;

    const contact = new ContactDetails({
      address,
      email,
      phones: Array.isArray(phones) ? phones : [phones]
    });

    await contact.save();
    res.status(201).json({ status: true, message: 'Contact details saved', data: contact });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};


exports.getContactDetails = async (req, res) => {
  try {
    const ContactDetails = req.db.model('ContactDetails', contactDetailsSchema);
    const data = await ContactDetails.find();
    res.status(200).json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};

exports.updateContactDetails = async (req, res) => {
  try {
    const ContactDetails = req.db.model('ContactDetails', contactDetailsSchema);
    const { id } = req.params;
    const { address, email, phones } = req.body;

    const updated = await ContactDetails.findByIdAndUpdate(
      id,
      {
        address,
        email,
        phones: Array.isArray(phones) ? phones : [phones]
      },
      { new: true }
    );

    res.status(200).json({ status: true, message: 'Updated successfully', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};

exports.deleteContactDetails = async (req, res) => {
  try {
    const ContactDetails = req.db.model('ContactDetails', contactDetailsSchema);
    const deleted = await ContactDetails.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: true, message: 'Deleted successfully', data: deleted });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Server error', error: err.message });
  }
};
