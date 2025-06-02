const Placement = require('../../models/centralAdmin/placementParagraphModel');

exports.addPlacementParagraph = async (req, res) => {
  try {
    const { paragraph } = req.body;
    console.log(paragraph)
    const placement = new Placement({ paragraph });
    await placement.save();
    res.json({ status: true, message: 'Placement paragraph added', data: placement });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.getPlacements = async (req, res) => {
  try {
    const placements = await Placement.find();
    res.json({ status: true, data: placements });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.updatePlacementParagraph = async (req, res) => {
  try {
    const updatedPlacement = await Placement.findByIdAndUpdate(
      req.params.id,
      { paragraph: req.body.paragraph },
      { new: true }
    );
    res.json({ status: true, message: 'Placement paragraph updated', data: updatedPlacement });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

exports.deletePlacementParagraph = async (req, res) => {
  try {
    await Placement.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Placement paragraph deleted' });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
