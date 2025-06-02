const express = require('express');
const router = express.Router();
const multer = require('multer');
const BannerController = require('../controllers/collegeadmin/banner.controller');
const WelcomeController = require('../controllers/collegeadmin/welcomemessage.controller');
const VisionMissionController = require('../controllers/collegeadmin/missionvision.controller');
const PrincipalMessageController = require('../controllers/collegeadmin/principalmessage.controller');
const HistoryController = require('../controllers/collegeadmin/collegehistory.controller');
const GoverningBodyController = require('../controllers/collegeadmin/governingbody.controller');
const StaffController = require('../controllers/collegeadmin/staff.controller');
const facultyController = require('../controllers/collegeadmin/faculty.controller');
const noticeController = require('../controllers/collegeadmin/noticeController');
const collegeContactController = require('../controllers/collegeadmin/collegeContactController');
const alumniController = require('../controllers/collegeadmin/alumniController');




const departmentCheck = require('../middleware/departmentCheck');

// Apply department check middleware to all routes
router.use(departmentCheck);






const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.get('/', (req,res) => { 
    res.status(200).send({message : 'banner management route'});
})

// add banner image
router.post('/addbanner', upload.single('bannerImage'), BannerController.createBanner);

// add welcome message
router.post('/add-welcome-msg', WelcomeController.createWelcomeMessage);

// add vision and mission
router.post('/add-vision-mission', VisionMissionController.createMissionVision);

// Add principal message
router.post('/add-principal-message', PrincipalMessageController.createMessage);

// Add history
router.post('/add-history', HistoryController.createHistory);

// Add governing body info
router.post('/add-governing', GoverningBodyController.createGoverningBody);

router.post('/add-staff', upload.single('uploadFile'), StaffController.addStaff);

router.post('/add-faculty-member', facultyController.addFaculty);

router.post('/add-notice', noticeController.addNotice);

router.get('/fetch-notices', noticeController.getNotices); 

router.post('/add-contact', collegeContactController.addCollegeContact);

router.post('/add-alumni', alumniController.addAlumni);







module.exports = router;
