const express = require('express');
const router = express.Router();
const multer = require('multer');





// HOME PAGE ROUTES
const contactUsController = require('../controllers/centralAdmin/contactUsController');
const sliderController = require('../controllers/centralAdmin/sliderController');
const aboutController = require('../controllers/centralAdmin/aboutController');
const futureProgrammesController = require('../controllers/centralAdmin/futureProgrammesController');
const placementController = require('../controllers/centralAdmin/placementController');
const placementImageController = require('../controllers/centralAdmin/placementImageController');
const homeServiceController = require('../controllers/centralAdmin/homeServiceController');
const testimonialController = require('../controllers/centralAdmin/testimonialController');
const facultyController = require('../controllers/centralAdmin/facultyController');
const articleController = require('../controllers/centralAdmin/articleController');



const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/sliders'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });
// For about (separate folder)
const aboutStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/about'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const aboutUpload = multer({ storage: aboutStorage });
// Multer setup for placement images
const addPlacementstorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/placementImages'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const addPlacementupload = multer({ storage : addPlacementstorage });

const addTestimonialstorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/testimonials'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const addTestimonialupload = multer({ storage :addTestimonialstorage});

const addFacultystorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/faculty'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const addFacultyupload = multer({ storage : addFacultystorage});

const articleStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/articles'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const articleUpload = multer({
  storage: articleStorage,
}).fields([
  { name: 'articleImage', maxCount: 1 },
  { name: 'authorImage', maxCount: 1 },
]);


router.post('/add-slider-image', upload.single('image'), sliderController.addSlider);
router.get('/sliders', sliderController.getSliders);
router.post('/contact-us', contactUsController.addContactQuery);
router.get('/contact-us', contactUsController.getContactQueries);
router.post('/add-about', aboutUpload.single('image'), aboutController.addAboutContent);
router.get('/who-we-are', aboutController.getAboutContent);
router.post('/add-future-programme', futureProgrammesController.addFutureProgramme);
router.get('/future-programmes', futureProgrammesController.getFutureProgrammes);
router.post('/add-placement', placementController.addPlacement);
router.get('/placements', placementController.getPlacements);
router.post('/add-placement-image', addPlacementupload.single('image'), placementImageController.addPlacementImage);
router.get('/placement-images', placementImageController.getPlacementImages);
router.post('/add-home-service', homeServiceController.addHomeService);
router.get('/home-services', homeServiceController.getHomeServices);
router.post('/add-testimonial', addTestimonialupload.single('image'), testimonialController.addTestimonial);
router.get('/testimonials', testimonialController.getTestimonials);
router.post('/add-faculty', addFacultyupload.single('image'), facultyController.addFaculty);
router.get('/faculty', facultyController.getFaculties);
router.post('/add-article', articleUpload, articleController.addArticle);
router.get('/blog-articles', articleController.getArticles);









//  ABOUT US SECTION API ROUTES
const whyWeAreController = require('../controllers/centralAdmin/whyWeAreController');


// Multer setup
const whyWeAreStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/whyweare'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const whyWeAreUpload = multer({
  storage: whyWeAreStorage,
}).single('whyWeAreImage');

// Routes
router.post('/add-why-we-are', whyWeAreUpload, whyWeAreController.addWhyWeAreContent);
router.get('/why-we-are', whyWeAreController.getWhyWeAreContent);
router.put('/update-why-we-are/:id', whyWeAreUpload, whyWeAreController.updateWhyWeAreContent);
router.delete('/delete-why-we-are/:id', whyWeAreController.deleteWhyWeAreContent);


const campusGalleryController = require('../controllers/centralAdmin/campusGalleryController');

// Storage setup
const campusGalleryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/campus_gallery'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const campusGalleryUpload = multer({ storage: campusGalleryStorage }).single('image');

// Routes
router.post('/add-campus-gallery', campusGalleryUpload, campusGalleryController.addCampusGallery);
router.get('/campus-gallery', campusGalleryController.getAllCampusGallery);
router.put('/update-campus-gallery/:id', campusGalleryUpload, campusGalleryController.updateCampusGallery);
router.delete('/delete-campus-gallery/:id', campusGalleryController.deleteCampusGallery);



const controller = require('../controllers/centralAdmin/visionMissionController');

router.post('/add-vision-mission', controller.addVisionMission);
router.get('/vision-mission', controller.getVisionMission);
router.put('/update-vision-mission/:id', controller.updateVisionMission);
router.delete('/delete-vision-mission/:id', controller.deleteVisionMission);


const placementParagraphController = require('../controllers/centralAdmin/placementParagraphController');

router.post('/add-placement-paragraph', placementParagraphController.addPlacementParagraph);
router.get('/placements-paragraph', placementParagraphController.getPlacements);
router.put('/update-placement-paragraph/:id', placementParagraphController.updatePlacementParagraph);
router.delete('/delete-placement-paragraph/:id', placementParagraphController.deletePlacementParagraph);



const highlightedCaseController = require('../controllers/centralAdmin/highlightedCaseController');

router.post('/add-highlighted-case', highlightedCaseController.addHighlightedCase);
router.get('/highlighted-cases', highlightedCaseController.getHighlightedCases);
router.put('/update-highlighted-case/:id', highlightedCaseController.updateHighlightedCase);
router.delete('/delete-highlighted-case/:id', highlightedCaseController.deleteHighlightedCase);



const altPresidentController = require('../controllers/centralAdmin/presidentMessageController');

// Storage setup for Alt President images
const altPresidentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/aboutpresident'),  // folder to store images
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)  // unique filename
});

const altUploadPresidentImage = multer({ storage: altPresidentStorage }).single('image');

// Then in your router file
router.post('/add-president-data', altUploadPresidentImage, altPresidentController.createAltPresidentMessage);
router.get('/president-data', altPresidentController.fetchAltPresidentMessages);
router.put('/edit-alt-president-msg/:id', altUploadPresidentImage, altPresidentController.modifyAltPresidentMessage);
router.delete('/remove-alt-president-msg/:id', altPresidentController.removeAltPresidentMessage);















module.exports = router;
