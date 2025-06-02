const Slider = require('../../models/centralAdmin/SliderModel');

const addSlider = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    const imagePath = req.file ? req.file.path : '';

    const newSlider = new Slider({ heading, paragraph, image: imagePath });
    await newSlider.save();

    res.status(201).json({ status:true, message: 'Slider added successfully', data: newSlider });
  } catch (error) {
    res.status(500).json({ message: 'Error adding slider', error: error.message });
  }
};

const getSliders = async (req, res) => {
  try {
    const sliders = await Slider.find().sort({ createdAt: -1 });
    res.json({ message: 'Fetched sliders successfully', data: sliders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sliders', error: error.message });
  }
};

module.exports = { addSlider, getSliders };
