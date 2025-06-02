const Testimonial = require('../../models/centralAdmin/Testimonial');

exports.addTestimonial = async (req, res) => {
  try {
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
    console.error('Error adding testimonial:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to add testimonial',
      error: error.message,
    });
  }
};

exports.getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.json({
      status: true,
      message: 'Testimonials fetched successfully',
      data: testimonials,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      status: false,
      message: 'Failed to fetch testimonials',
      error: error.message,
    });
  }
};
