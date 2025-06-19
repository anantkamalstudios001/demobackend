// controllers/collegeAdmin/academicsOverviewController.js
const academicsOverviewSchema = require('../../models/centralAdmin/academicsOverviewSchema');



// const addAcademicsOverview = async (req, res) => {
//   try {
//     const AcademicsOverview = req.db.model('AcademicsOverview', academicsOverviewSchema);

//     // console.log('file',req.file)
//     // console.log('file',req.files)
//     // console.log('headers',req.headers)
//     // console.log('body',req.body)

//     const about = req.body.about;

//   // Print files
// console.log('📁 Files:', req.files);

// // Map files using their dynamic field names
// const filesMap = {};
// if (req.files && Array.isArray(req.files)) {
//   req.files.forEach(file => {
//     filesMap[file.fieldname] = file;
//   });
// }

// // Collect programs
// const programs = [];
// const programIndexes = new Set();

// Object.keys(req.body).forEach(key => {
//   const match = key.match(/^programs\[(\d+)]\[name]|^programs\[(\d+)]\[paragraph]/);
//   if (match) {
//     const index = match[1] || match[2];
//     programIndexes.add(Number(index));
//   }
// });

// for (const index of [...programIndexes].sort()) {
//   const name = req.body[`programs[${index}][name]`];
//   const paragraph = req.body[`programs[${index}][paragraph]`];
//   const imageFile = filesMap[`programs[${index}][image]`];

//   const image = imageFile ? imageFile.path : '';

//   if (name && paragraph) {
//     programs.push({ name, paragraph, image });
//   }
// }


//     const faculties = req.body.faculties ? JSON.parse(req.body.faculties) : [];
//     const highlights = req.body.highlights ? JSON.parse(req.body.highlights) : [];

//     const newDoc = new AcademicsOverview({ about, programs, faculties, highlights });
//     const saved = await newDoc.save();

//     console.log('✅ Saved:', saved);
//     res.status(201).json({ status: true, message: 'Academics Overview saved', data: saved });

//   } catch (error) {
//     console.error('❌ Save Error:', error.message);
//     res.status(500).json({ status: false, message: 'Save failed', error: error.message });
//   }
// };



const addAcademicsOverview = async (req, res) => {
  try {
    const AcademicsOverview = req.db.model('AcademicsOverview', academicsOverviewSchema);

    const about = req.body.about;

    // ✅ Parse programs directly from req.body
    const programs = Array.isArray(req.body.programs) ? req.body.programs : [];

    // ✅ Attach image files if any
    if (req.files && Array.isArray(req.files)) {
      req.files.forEach((file) => {
        const match = file.fieldname.match(/^programs\[(\d+)]\[image]$/);
        if (match) {
          const index = parseInt(match[1]);
          if (!programs[index]) programs[index] = {};
          programs[index].image = file.path;
        }
      });
    }

    // ✅ Parse faculties and highlights
    const faculties = req.body.faculties ? JSON.parse(req.body.faculties) : [];
    const highlights = req.body.highlights ? JSON.parse(req.body.highlights) : [];

    // ✅ Save to DB
    const newOverview = new AcademicsOverview({
      about,
      programs,
      faculties,
      highlights,
    });

    const saved = await newOverview.save();
    console.log('✅ Saved:', saved);
    res.status(201).json({ status: true, message: 'Academics Overview saved', data: saved });

  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).json({ status: false, message: 'Failed to save', error: err.message });
  }
};




const getAcademicsOverview = async (req, res) => {
  try {
    const AcademicsOverview = req.db.model('AcademicsOverview', academicsOverviewSchema);
    const data = await AcademicsOverview.find();
    res.json({ status: true, data });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error fetching data', error: error.message });
  }
};

const updateAcademicsOverview = async (req, res) => {
  try {
    const AcademicsOverview = req.db.model('AcademicsOverview', academicsOverviewSchema);
    const { id } = req.params;
    const updated = await AcademicsOverview.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ status: true, message: 'Updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Update error', error: error.message });
  }
};

const deleteAcademicsOverview = async (req, res) => {
  try {
    const AcademicsOverview = req.db.model('AcademicsOverview', academicsOverviewSchema);
    const { id } = req.params;
    await AcademicsOverview.findByIdAndDelete(id);
    res.json({ status: true, message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Delete error', error: error.message });
  }
};

module.exports = {
  addAcademicsOverview,
  getAcademicsOverview,
  updateAcademicsOverview,
  deleteAcademicsOverview,
};
