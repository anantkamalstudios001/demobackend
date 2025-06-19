const holidayListSchema = require('../../models/centralAdmin/HolidayList');

exports.addHoliday = async (req, res) => {
  try {
    const Holiday = req.db.model('HolidayList', holidayListSchema);

    const { date, day, icon, title, notes } = req.body;

    const newHoliday = new Holiday({ date, day, icon, title, notes });
    await newHoliday.save();

    res.status(201).json({
      status: true,
      message: 'Holiday added successfully',
      data: newHoliday
    });
  } catch (err) {
    console.error('Error adding holiday:', err);
    res.status(500).json({ status: false, message: 'Failed to add holiday', error: err.message });
  }
};

exports.getHolidays = async (req, res) => {
  try {
    const Holiday = req.db.model('HolidayList', holidayListSchema);
    const holidays = await Holiday.find().sort({ date: 1 }); // sorted by date ascending

    res.status(200).json({
      status: true,
      message: 'Holidays fetched successfully',
      data: holidays
    });
  } catch (err) {
    console.error('Error fetching holidays:', err);
    res.status(500).json({ status: false, message: 'Failed to fetch holidays', error: err.message });
  }
};

exports.updateHoliday = async (req, res) => {
  try {
    const Holiday = req.db.model('HolidayList', holidayListSchema);
    const { id } = req.params;
    const { date, day, icon, title, notes } = req.body;

    const updated = await Holiday.findByIdAndUpdate(id, { date, day, icon, title, notes }, { new: true });

    if (!updated) return res.status(404).json({ status: false, message: 'Holiday not found' });

    res.status(200).json({
      status: true,
      message: 'Holiday updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Error updating holiday:', err);
    res.status(500).json({ status: false, message: 'Failed to update holiday', error: err.message });
  }
};

exports.deleteHoliday = async (req, res) => {
  try {
    const Holiday = req.db.model('HolidayList', holidayListSchema);
    const { id } = req.params;

    const deleted = await Holiday.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ status: false, message: 'Holiday not found' });

    res.status(200).json({
      status: true,
      message: 'Holiday deleted successfully'
    });
  } catch (err) {
    console.error('Error deleting holiday:', err);
    res.status(500).json({ status: false, message: 'Failed to delete holiday', error: err.message });
  }
};
