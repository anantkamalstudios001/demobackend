    // console.log(req.body);
    // console.log(req.files);



const governingBodySchema = require('../../models/centralAdmin/governingBody');

// ADD Governing Body
exports.addGoverningBody = async (req, res) => {
  try {
    const GoverningBody = req.db.model('GoverningBody', governingBodySchema);

    console.log(req.files);
    const { about, roles, members } = req.body;

    // Convert roles safely
    const parsedRoles = Array.isArray(roles) ? roles : roles ? [roles] : [];

 const parsedMembers = [];

if (Array.isArray(members)) {
  parsedMembers.push(
    ...members.map((mem, i) => {
      const fileObj = req.files?.find(f => f.fieldname === `members[${i}][image]`);
      return {
        name: mem.name,
        post: mem.post,
        about: mem.about,
        image: fileObj ? fileObj.path : ''
      };
    })
  );
}


    const newEntry = new GoverningBody({
      about,
      roles: parsedRoles,
      members: parsedMembers,
    });

    await newEntry.save();

    res.status(201).json({
      status: true,
      message: 'Governing body added',
      data: newEntry,
    });
  } catch (err) {
    console.error('Error in addGoverningBody:', err);
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
};



// GET ALL
exports.getGoverningBodies = async (req, res) => {
  try {
    const GoverningBody = req.db.model('GoverningBody', governingBodySchema);
    const data = await GoverningBody.find();
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error', error: error.message });
  }
};

// UPDATE
exports.updateGoverningBody = async (req, res) => {
  try {
    const GoverningBody = req.db.model('GoverningBody', governingBodySchema);
    const id = req.params.id;

    const { about } = req.body;
    const roles = Array.isArray(req.body['roles[]']) ? req.body['roles[]'] : [req.body['roles[]']];

    const members = [];
    let i = 0;
    while (req.body[`members[${i}][name]`]) {
      members.push({
        name: req.body[`members[${i}][name]`],
        post: req.body[`members[${i}][post]`],
        about: req.body[`members[${i}][about]`],
        image: req.files?.[`members[${i}][image]`] ?
          req.files[`members[${i}][image]`][0].path : ''
      });
      i++;
    }

    const updated = await GoverningBody.findByIdAndUpdate(
      id,
      { about, roles, members },
      { new: true }
    );

    res.status(200).json({ status: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error', error: error.message });
  }
};

// DELETE
exports.deleteGoverningBody = async (req, res) => {
  try {
    const GoverningBody = req.db.model('GoverningBody', governingBodySchema);
    const id = req.params.id;
    const deleted = await GoverningBody.findByIdAndDelete(id);
    res.status(200).json({ status: true, message: 'Deleted successfully', data: deleted });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server Error', error: error.message });
  }
};
