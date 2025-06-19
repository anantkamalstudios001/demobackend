const printMediaSchema = require('../../models/centralAdmin/printMedia.model');

exports.addPrintMedia = async (req, res) => {
  try {
    const PrintMedia = req.db.model('PrintMedia', printMediaSchema);

    let cards = req.body.cards;

    // If cards is a stringified array, parse it
    if (typeof cards === 'string') {
      cards = JSON.parse(cards);
    }

    // Ensure cards is an array
    if (!Array.isArray(cards)) {
      cards = [];
    }

    // Assign images to corresponding cards
    (req.files || []).forEach(file => {
      const match = file.fieldname.match(/^cards\[(\d+)]\[image]$/);
      if (match) {
        const index = parseInt(match[1]);
        if (cards[index]) {
          cards[index].image = file.filename;
        }
      }
    });

    const data = {
      icon: req.body.icon,
      buttonName: req.body.buttonName,
      cards: cards
    };

    const saved = await new PrintMedia(data).save();
    res.status(201).json({ status: true, message: 'Print media saved', data: saved });

  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};


exports.getPrintMedia = async (req, res) => {
  try {
    const PrintMedia = req.db.model('PrintMedia', printMediaSchema);
    const data = await PrintMedia.find();
    res.json({ status: true, data });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

exports.updatePrintMedia = async (req, res) => {
  try {
    const PrintMedia = req.db.model('PrintMedia', printMediaSchema);

    const cards = req.body.cards ? JSON.parse(req.body.cards) : [];
    const uploadedFiles = req.files || [];

    cards.forEach((card, index) => {
      if (uploadedFiles[index]) {
        card.image = uploadedFiles[index].filename;
      }
    });

    const updated = await PrintMedia.findByIdAndUpdate(
      req.params.id,
      {
        icon: req.body.icon,
        buttonName: req.body.buttonName,
        cards: cards
      },
      { new: true }
    );

    res.json({ status: true, message: 'Updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

exports.deletePrintMedia = async (req, res) => {
  try {
    const PrintMedia = req.db.model('PrintMedia', printMediaSchema);
    await PrintMedia.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
