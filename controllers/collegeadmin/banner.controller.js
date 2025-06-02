const Banner = require('../../models/collegeadmin/banner.model.js');

exports.createBanner = async (req, res) => {
  try {
    const { title, link, order, isActive } = req.body;
    // console.log(req.body);

    const banner = new Banner({
      title,
      link,
      order: Number(order),
      isActive: isActive === 'true', // comes as string
      imagePath: req.file?.filename || null
    });

    await banner.save();
    res.status(201).json({ message: 'Banner created', banner });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
