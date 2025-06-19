const sliderSchema = require('../../models/centralAdmin/SliderModel');

// ADD
exports.addSlider = async (req, res) => {
  try {
    const Slider = req.db.model('Slider', sliderSchema);
    const { heading, paragraph, button } = req.body;
    const image = req.file ? req.file.filename : '';

    const newSlider = new Slider({ heading, paragraph, button, image });
    await newSlider.save();

    res.status(201).json({ status: true, message: 'Slider added', data: newSlider });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Add failed', error: err.message });
  }
};

// GET ALL
exports.getSliders = async (req, res) => {
  try {
    const Slider = req.db.model('Slider', sliderSchema);
    const sliders = await Slider.find().sort({ createdAt: -1 });
    res.json({ status: true, message: 'Sliders fetched', data: sliders });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Fetch failed', error: err.message });
  }
};

// UPDATE
exports.updateSlider = async (req, res) => {
  try {
    const Slider = req.db.model('Slider', sliderSchema);
    const { heading, paragraph, button } = req.body;

    const updateData = { heading, paragraph, button };
    if (req.file) updateData.image = req.file.filename;

    const updated = await Slider.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({ status: true, message: 'Slider updated', data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Update failed', error: err.message });
  }
};

// DELETE
exports.deleteSlider = async (req, res) => {
  try {
    const Slider = req.db.model('Slider', sliderSchema);
    await Slider.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Slider deleted' });
  } catch (err) {
    res.status(500).json({ status: false, message: 'Delete failed', error: err.message });
  }
};
