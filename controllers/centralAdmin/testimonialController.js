const testimonialSchema = require('../../models/centralAdmin/Testimonial');

// Add Testimonial
exports.addTestimonial = async (req, res) => {
  try {
    const Testimonial = req.db.model('Testimonial', testimonialSchema);
    const { personName, jobTitle, starRating, testimonialContent } = req.body;
    const image = req.file ? req.file.path : '';

    const newTestimonial = new Testimonial({
      personName,
      jobTitle,
      starRating,
      testimonialContent,
      image,
    });

    await newTestimonial.save();

    res.status(201).json({
      status: true,
      message: 'Testimonial added successfully',
      data: newTestimonial,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to add testimonial',
      error: error.message,
    });
  }
};

// Get Testimonials
exports.getTestimonials = async (req, res) => {
  try {
    const Testimonial = req.db.model('Testimonial', testimonialSchema);
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Testimonials fetched successfully',
      data: testimonials,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to fetch testimonials',
      error: error.message,
    });
  }
};

// Update Testimonial
exports.updateTestimonial = async (req, res) => {
  try {
    const Testimonial = req.db.model('Testimonial', testimonialSchema);
    const { personName, jobTitle, starRating, testimonialContent } = req.body;
    const updateData = { personName, jobTitle, starRating, testimonialContent };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });

    res.json({
      status: true,
      message: 'Testimonial updated successfully',
      data: updated,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to update testimonial',
      error: error.message,
    });
  }
};

// Delete Testimonial
exports.deleteTestimonial = async (req, res) => {
  try {
    const Testimonial = req.db.model('Testimonial', testimonialSchema);
    await Testimonial.findByIdAndDelete(req.params.id);

    res.json({
      status: true,
      message: 'Testimonial deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Failed to delete testimonial',
      error: error.message,
    });
  }
};
