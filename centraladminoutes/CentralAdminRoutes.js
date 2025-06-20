const express = require('express');
const router = express.Router();
const multer = require('multer');
const attachDb = require('../middleware/attachDb');





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
  destination: (req, file, cb) => cb(null, 'uploads/whoweare'),
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


router.post('/add-slider-image', attachDb, upload.single('image'), sliderController.addSlider);
router.get('/sliders', attachDb, sliderController.getSliders);
router.put('/slider/:id', attachDb, upload.single('image'), sliderController.updateSlider);
router.delete('/slider/:id', attachDb, sliderController.deleteSlider);






router.post('/contact-us', attachDb, contactUsController.addContactQuery);
router.get('/contact-us', attachDb, contactUsController.getContactQueries);
router.delete('/contact-us/:id', attachDb, contactUsController.deleteContactQuery);








const mouController = require('../controllers/centralAdmin/mou.controller');

router.post('/add-mou', attachDb, mouController.addMoU);
router.get('/mou', attachDb, mouController.getMoUs);
router.put('/mou/:id', attachDb, mouController.updateMoU);
router.delete('/mou/:id', attachDb, mouController.deleteMoU);






router.post('/add-who-we-are', attachDb, aboutUpload.single('image'), aboutController.addAboutContent);
router.get('/who-we-are', attachDb, aboutController.getAboutContent);
router.put('/who-we-are/:id', attachDb, aboutUpload.single('image'), aboutController.updateAboutContent);
router.delete('/who-we-are/:id', attachDb, aboutController.deleteAboutContent);


// router.get('/who-we-are', aboutController.getAboutContent);
router.post('/add-future-programme',attachDb, futureProgrammesController.addFutureProgramme);
router.get('/future-programmes',attachDb, futureProgrammesController.getFutureProgrammes);
router.put('/future-programme/:id', attachDb, futureProgrammesController.updateFutureProgramme);
router.delete('/future-programme/:id', attachDb, futureProgrammesController.deleteFutureProgramme);









router.post('/add-placement', attachDb, placementController.addPlacement);
router.get('/placements', attachDb, placementController.getPlacements);
router.put('/placement/:id', attachDb, placementController.updatePlacement);
router.delete('/placement/:id', attachDb, placementController.deletePlacement);











const addPlacementUpload = multer({ dest: 'uploads/placementImages' });
router.post('/add-placement-image', attachDb, addPlacementUpload.single('image'), placementImageController.addPlacementImage);
router.get('/placement-images', attachDb, placementImageController.getPlacementImages);
router.put('/placement-image/:id', attachDb, addPlacementUpload.single('image'), placementImageController.updatePlacementImage);
router.delete('/placement-image/:id', attachDb, placementImageController.deletePlacementImage);








router.post('/add-home-service', attachDb, homeServiceController.addHomeService);
router.get('/home-services', attachDb, homeServiceController.getHomeServices);
router.put('/home-service/:id', attachDb, homeServiceController.updateHomeService);
router.delete('/home-service/:id', attachDb, homeServiceController.deleteHomeService);






router.post('/add-testimonial', attachDb, addTestimonialupload.single('image'), testimonialController.addTestimonial);
router.get('/testimonials', attachDb, testimonialController.getTestimonials);
router.put('/testimonial/:id', attachDb, addTestimonialupload.single('image'), testimonialController.updateTestimonial);
router.delete('/testimonial/:id', attachDb, testimonialController.deleteTestimonial);






router.post('/add-faculty', attachDb, addFacultyupload.single('image'), facultyController.addFaculty);
router.get('/faculty', attachDb, facultyController.getFaculties);
router.put('/faculty/:id', attachDb, addFacultyupload.single('image'), facultyController.updateFaculty);
router.delete('/faculty/:id', attachDb, facultyController.deleteFaculty);









router.post('/add-article', attachDb, articleUpload, articleController.addArticle);
router.get('/blog-articles', attachDb, articleController.getArticles);
router.put('/blog-articles/:id', attachDb, articleUpload, articleController.updateArticle);
router.delete('/blog-articles/:id', attachDb, articleController.deleteArticle);










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
router.post('/add-why-we-are', attachDb, whyWeAreUpload, whyWeAreController.addWhyWeAreContent);
router.get('/why-we-are', attachDb, whyWeAreController.getWhyWeAreContent);
router.put('/update-why-we-are/:id', attachDb, whyWeAreUpload, whyWeAreController.updateWhyWeAreContent);
router.delete('/delete-why-we-are/:id', attachDb, whyWeAreController.deleteWhyWeAreContent);







const logoController = require('../controllers/centralAdmin/logoController');
const logo_upload = multer({ dest: 'uploads/logo' });

router.post('/add-logo', attachDb, logo_upload.single('logo'), logoController.addLogo);
router.get('/logo', attachDb, logoController.getLogo);
router.put('/update-logo/:id', attachDb, logo_upload.single('logo'), logoController.updateLogo);
router.delete('/delete-logo/:id', attachDb, logoController.deleteLogo);












const latestNewsController = require('../controllers/centralAdmin/latestNewsController');

router.post('/add-latest-news', attachDb, latestNewsController.addLatestNews);
router.get('/latest-news', attachDb, latestNewsController.getLatestNews);
router.put('/update-latest-news/:id', attachDb, latestNewsController.updateLatestNews);
router.delete('/delete-latest-news/:id', attachDb, latestNewsController.deleteLatestNews);






const campusGalleryController = require('../controllers/centralAdmin/campusGalleryController');

// Storage setup
const campusGalleryStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/campus_gallery'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const campusGalleryUpload = multer({ storage: campusGalleryStorage }).single('image');

// Routes
router.post('/add-campus-gallery', attachDb, campusGalleryUpload, campusGalleryController.addCampusGallery);
router.get('/campus-gallery', attachDb, campusGalleryController.getAllCampusGallery);
router.put('/update-campus-gallery/:id', attachDb, campusGalleryUpload, campusGalleryController.updateCampusGallery);
router.delete('/delete-campus-gallery/:id', attachDb, campusGalleryController.deleteCampusGallery);




const controller = require('../controllers/centralAdmin/visionMissionController');

router.post('/add-vision-mission', attachDb, controller.addVisionMission);
router.get('/vision-mission', attachDb, controller.getVisionMission);
router.put('/update-vision-mission/:id', attachDb, controller.updateVisionMission);
router.delete('/delete-vision-mission/:id', attachDb, controller.deleteVisionMission);





const core_value_controller = require('../controllers/centralAdmin/coreValuesController');

router.post('/add-core-value', attachDb, core_value_controller.addCoreValues);
router.get('/core-value', attachDb, core_value_controller.getCoreValue);
router.put('/update-core-value/:id', attachDb, core_value_controller.updateCoreValue);
router.delete('/delete-core-value/:id', attachDb, core_value_controller.deleteCoreValue);




const placementParagraphController = require('../controllers/centralAdmin/placementParagraphController');

router.post('/add-placement-paragraph', attachDb, placementParagraphController.addPlacementParagraph);
router.get('/placements-paragraph', attachDb, placementParagraphController.getPlacements);
router.put('/update-placement-paragraph/:id', attachDb, placementParagraphController.updatePlacementParagraph);
router.delete('/delete-placement-paragraph/:id', attachDb, placementParagraphController.deletePlacementParagraph);




const highlightedCaseController = require('../controllers/centralAdmin/highlightedCaseController');

router.post('/add-highlighted-case', attachDb, highlightedCaseController.addHighlightedCase);
router.get('/highlighted-cases', attachDb, highlightedCaseController.getHighlightedCases);
router.put('/update-highlighted-case/:id', attachDb, highlightedCaseController.updateHighlightedCase);
router.delete('/delete-highlighted-case/:id', attachDb, highlightedCaseController.deleteHighlightedCase);




const altPresidentController = require('../controllers/centralAdmin/presidentMessageController');

// Storage setup for Alt President images
const altPresidentStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/aboutpresident'),  // folder to store images
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)  // unique filename
});

const altUploadPresidentImage = multer({ storage: altPresidentStorage }).single('image');

// Then in your router file
router.post('/add-president-data', attachDb, altUploadPresidentImage, altPresidentController.createAltPresidentMessage);
router.get('/president-data', attachDb, altPresidentController.fetchAltPresidentMessages);
router.put('/edit-alt-president-msg/:id', attachDb, altUploadPresidentImage, altPresidentController.modifyAltPresidentMessage);
router.delete('/remove-alt-president-msg/:id', attachDb, altPresidentController.removeAltPresidentMessage);






const chairmanController = require('../controllers/centralAdmin/chairmanMessageController');


const chairmanUpload = multer({ dest: 'uploads/chairman' });


// Routes
router.post('/add-chairman-data', attachDb, chairmanUpload.single('image'), chairmanController.createChairmanMessage);
router.get('/chairman-data', attachDb, chairmanController.fetchChairmanMessages);
router.put('/update-chairman-msg/:id', attachDb, chairmanUpload.single('image'), chairmanController.updateChairmanMessage);
router.delete('/delete-chairman-msg/:id', attachDb, chairmanController.deleteChairmanMessage);








// viceChancellor data

const viceChancellorController = require('../controllers/centralAdmin/chancellorController');

// Storage setup for Alt President images
const viceChancellorStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/viceChancellor'),  // folder to store images
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)  // unique filename
});

const viceChancellorImage = multer({ storage: viceChancellorStorage }).single('image');

router.post('/add-chancellor-data', attachDb, viceChancellorImage, viceChancellorController.createAltPresidentMessage);
router.get('/chancellor-data', attachDb, viceChancellorController.fetchAltPresidentMessages);
router.put('/edit-chancellor-msg/:id', attachDb, viceChancellorImage, viceChancellorController.modifyAltPresidentMessage);
router.delete('/remove-chancellor-msg/:id', attachDb, viceChancellorController.removeAltPresidentMessage);





const approvalController = require('../controllers/centralAdmin/approvalController');
const approvalUpload = multer({ dest: 'uploads/approval' });

router.post('/add-approval', attachDb, approvalUpload.single('image'), approvalController.addApproval);
router.get('/approvals', attachDb, approvalController.getApprovals);
router.put('/update-approval/:id', attachDb, approvalUpload.single('image'), approvalController.updateApproval);
router.delete('/delete-approval/:id', attachDb, approvalController.deleteApproval);



const affiliationController = require('../controllers/centralAdmin/affiliationController');
const affiliationUpload = multer({ dest: 'uploads/affiliation' });


router.post('/add-affiliation', attachDb, affiliationUpload.single('image'), affiliationController.addAffiliation);
router.get('/affiliations', attachDb, affiliationController.getAffiliations);
router.put('/update-affiliation/:id', attachDb, affiliationUpload.single('image'), affiliationController.updateAffiliation);
router.delete('/delete-affiliation/:id', attachDb, affiliationController.deleteAffiliation);







const authorityController = require('../controllers/centralAdmin/authorityController');

router.post('/add-authority', attachDb, authorityController.addAuthority);
router.get('/authorities', attachDb, authorityController.getAuthorities);
router.put('/update-authority/:id', attachDb, authorityController.updateAuthority);
router.delete('/delete-authority/:id', attachDb, authorityController.deleteAuthority);













const governingBodyController = require('../controllers/centralAdmin/governingBodyController.js');

// Setup multer
const governingstorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/governingBody'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const governingBodyUpload = multer({ storage: governingstorage });

router.post(
  '/add-governing-body',
  attachDb,
  governingBodyUpload.any(),
  governingBodyController.addGoverningBody
);

router.get(
  '/governing-body',
  attachDb,
  governingBodyController.getGoverningBodies
);

router.put(
  '/update-governing-body/:id',
  attachDb,
  governingBodyUpload.any(),
  governingBodyController.updateGoverningBody
);

router.delete(
  '/delete-governing-body/:id',
  attachDb,
  governingBodyController.deleteGoverningBody
);

module.exports = router;



















const ourCommitteesController = require('../controllers/centralAdmin/ourCommitteesController');

router.post('/add-our-committees', attachDb, ourCommitteesController.addOurCommittees);
router.get('/our-committees', attachDb, ourCommitteesController.getOurCommittees);
router.put('/update-our-committees/:id', attachDb, ourCommitteesController.updateOurCommittees);
router.delete('/delete-our-committees/:id', attachDb, ourCommitteesController.deleteOurCommittees);











const committeeController = require('../controllers/centralAdmin/committeeController');

router.post('/add-committee', attachDb, committeeController.addCommittee);
router.get('/committees', attachDb, committeeController.getCommittees);
router.put('/update-committee/:id', attachDb, committeeController.updateCommittee);
router.delete('/delete-committee/:id', attachDb, committeeController.deleteCommittee);













// ACADEMICS


// routes/collegeAdminRoutes.js
const academicsOverviewController = require('../controllers/centralAdmin/academicsOverviewController');

const academicsupload = multer({ dest: 'uploads/academics' }); // or your desired folder
router.post('/add-academics-overview', attachDb, academicsupload.any(), academicsOverviewController.addAcademicsOverview);
router.get('/academics-overview', attachDb, academicsOverviewController.getAcademicsOverview);
router.put('/academics-overview/:id', attachDb, academicsOverviewController.updateAcademicsOverview);
router.delete('/academics-overview/:id', attachDb, academicsOverviewController.deleteAcademicsOverview);













const path = require('path');
const {
  addAcademicCalendar,
  getAcademicCalendars,
  updateAcademicCalendar,
  deleteAcademicCalendar
} = require('../controllers/centralAdmin/addAcademicCalendarController');

// Storage config
const academicstorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/academic-calendar'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const academicstorageupload = multer({ storage: academicstorage });

// Routes
router.post('/add-academic-calendar', attachDb, academicstorageupload.single('pdf'), addAcademicCalendar);
router.get('/get-academic-calendars', attachDb, getAcademicCalendars);
router.put('/update-academic-calendar/:id', attachDb, academicstorageupload.single('pdf'), updateAcademicCalendar);
router.delete('/delete-academic-calendar/:id', attachDb, deleteAcademicCalendar);









const holidayListController = require('../controllers/centralAdmin/holidayListController');

router.post('/add-holiday', attachDb, holidayListController.addHoliday);
router.get('/holidays', attachDb, holidayListController.getHolidays);
router.put('/update-holiday/:id', attachDb, holidayListController.updateHoliday);
router.delete('/delete-holiday/:id', attachDb, holidayListController.deleteHoliday);












const {
  addDepartmentCard,
  getDepartmentCards,
  updateDepartmentCard,
  deleteDepartmentCard
} = require('../controllers/centralAdmin/departmentCardController');

router.post('/add-department-card', attachDb, addDepartmentCard);
router.get('/get-department-cards', attachDb, getDepartmentCards);
router.put('/update-department-card/:id', attachDb, updateDepartmentCard);
router.delete('/delete-department-card/:id', attachDb, deleteDepartmentCard);











// const boardManagementController = require('../controllers/centralAdmin/boardManagementController');

// const boardStorage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/boardManagement/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
// });

// const boardManagementUpload = multer({ storage: boardStorage });

// router.post(
//   '/add-board-management',
//   attachDb,
//   boardManagementUpload.any(),
//   boardManagementController.addBoardManagement
// );

// router.get('/board-management', attachDb, boardManagementController.getBoardManagement);
// router.put('/update-board-management/:id', attachDb, upload.any(), boardManagementController.updateBoardManagement);
// router.delete('/delete-board-management/:id', attachDb, boardManagementController.deleteBoardManagement);












const universityOfficerController = require('../controllers/centralAdmin/universityOfficerController');

const officersstorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/universityOfficers/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const officersupload = multer({ storage : officersstorage });
// const governingBodyUpload = multer({ storage: governingstorage });


router.post(
  '/add-university-officers',
  attachDb,
  officersupload.any(),
  universityOfficerController.addUniversityOfficers
);


// ✅ routes/universityOfficer.routes.js

router.get(
  '/university-officers',
  attachDb,
  universityOfficerController.getUniversityOfficers
);

router.put(
  '/update-university-officers/:id',
  attachDb,
  officersupload.any(),
  universityOfficerController.updateUniversityOfficers
);

router.delete(
  '/delete-university-officers/:id',
  attachDb,
  universityOfficerController.deleteUniversityOfficer
);











const academicSectionController = require('../controllers/centralAdmin/academicSectionController');

router.post('/add-rule', attachDb, academicSectionController.addAcademicSection);
router.get('/get-rules', attachDb, academicSectionController.getAcademicSections);
router.put('/rule-section/:id', attachDb, academicSectionController.updateAcademicSection);
router.delete('/rule-section/:id', attachDb, academicSectionController.deleteAcademicSection);













const scholarshipController = require('../controllers/centralAdmin/scholarshipController');

router.post('/add-scholarship', attachDb, scholarshipController.addScholarship);
router.get('/scholarships', attachDb, scholarshipController.getScholarships);
router.put('/scholarship/:id', attachDb, scholarshipController.updateScholarship);
router.delete('/scholarship/:id', attachDb, scholarshipController.deleteScholarship);






const eligibilityController = require('../controllers/centralAdmin/eligibilityController.js');

router.post('/add-eligibility', attachDb, eligibilityController.addEligibility);
router.get('/eligibilities', attachDb, eligibilityController.getEligibilities);
router.put('/eligibility/:id', attachDb, eligibilityController.updateEligibility);
router.delete('/eligibility/:id', attachDb, eligibilityController.deleteEligibility);









const paragraphBlockController = require('../controllers/centralAdmin/paragraphBlockController');

router.post('/add-paragraph-block', attachDb, paragraphBlockController.addParagraphBlock);
router.get('/paragraph-blocks', attachDb, paragraphBlockController.getParagraphBlocks);
router.put('/paragraph-block/:id', attachDb, paragraphBlockController.updateParagraphBlock);
router.delete('/paragraph-block/:id', attachDb, paragraphBlockController.deleteParagraphBlock);







const faqController = require('../controllers/centralAdmin/faqController');

router.post('/add-faq', attachDb, faqController.addFaq);
router.get('/faqs', attachDb, faqController.getFaqs);
router.put('/faq/:id', attachDb, faqController.updateFaq);
router.delete('/faq/:id', attachDb, faqController.deleteFaq);








const feeStructureController = require('../controllers/centralAdmin/feeStructureController');

router.post('/add-fee-structure', attachDb, feeStructureController.addFeeStructure);
router.get('/fee-structure', attachDb, feeStructureController.getFeeStructure);
router.put('/update-fee-structure/:id', attachDb, feeStructureController.updateFeeStructure);
router.delete('/delete-fee-structure/:id', attachDb, feeStructureController.deleteFeeStructure);








const placementOverviewController = require('../controllers/centralAdmin/placementOverviewController');
const placementUpload = multer({ dest: 'uploads/overviewplacement' });

router.post('/add-placement-overview', attachDb, placementUpload.single('image'), placementOverviewController.addPlacementOverview);
router.get('/placement-overview', attachDb, placementOverviewController.getPlacementOverview);
router.put('/placement-overview/:id', attachDb, placementUpload.single('image'), placementOverviewController.updatePlacementOverview);
router.delete('/placement-overview/:id', attachDb, placementOverviewController.deletePlacementOverview);









const placementGalleryController = require('../controllers/centralAdmin/placementGallery.controller');

const galleryUpload = multer({ dest: 'uploads/placementGallery' });

router.post('/placement-gallery', attachDb, galleryUpload.array('images'), placementGalleryController.addPlacementGallery);
router.get('/placement-gallery', attachDb, placementGalleryController.getPlacementGallery);
router.put('/placement-gallery/:id', attachDb, galleryUpload.array('images'), placementGalleryController.updatePlacementGallery);
router.delete('/placement-gallery/:id', attachDb, placementGalleryController.deletePlacementGallery);









const placementPolicyController = require('../controllers/centralAdmin/placementPolicyController');
const placementPolicyUpload = multer({ dest: 'uploads/placement-policy' });

router.post('/add-placement-policy', attachDb, placementPolicyUpload.single('image'), placementPolicyController.addOrUpdatePlacementPolicy);
router.get('/placement-policy', attachDb, placementPolicyController.getPlacementPolicy);
router.put('/placement-policy/:id', attachDb, placementPolicyUpload.single('image'), placementPolicyController.updatePlacementPolicy);
router.delete('/placement-policy/:id', attachDb, placementPolicyController.deletePlacementPolicy);








// routes/collegeAdminRoutes.js
const corporateTieupsController = require('../controllers/centralAdmin/corporateTieupsController');
const tieupsupload = multer({ dest: 'uploads/corporate' }); // Folder where images are saved

router.post( '/add-corporate-tieups',attachDb, tieupsupload.fields([ { name: 'bannerImage', maxCount: 1 },{name: 'partnerLogos',maxCount: 10}]),corporateTieupsController.addCorporateTieups);
router.get('/corporate-tieups', attachDb, corporateTieupsController.getCorporateTieups);
router.put('/corporate-tieups/:id', attachDb, tieupsupload.any(), corporateTieupsController.updateCorporateTieups);
router.delete('/corporate-tieups/:id', attachDb, corporateTieupsController.deleteCorporateTieups);











const recruiterslogocontroller = require('../controllers/centralAdmin/leadingRecruiter.controller.js');

const recruiterslogoupload = multer({ dest: 'uploads/recruitersimages' });

router.post('/leading-recruiters',attachDb, recruiterslogoupload.single('logo'), recruiterslogocontroller.addLeadingRecruiter);
router.get('/leading-recruiters',attachDb, recruiterslogocontroller.getLeadingRecruiters);
router.put('/leading-recruiters/:id',attachDb, recruiterslogoupload.single('logo'), recruiterslogocontroller.updateLeadingRecruiter);
router.delete('/leading-recruiters/:id',attachDb, recruiterslogocontroller.deleteLeadingRecruiter);








const Campus_Gallery_upload_controller = require('../controllers/centralAdmin/imageCaption.controller.js');

const Campus_Gallery_upload = multer({ dest: 'uploads/gallery' });

router.post('/campus-life-gallery',attachDb, Campus_Gallery_upload.single('image'), Campus_Gallery_upload_controller.addImageCaption);
router.get('/campus-life-gallery',attachDb, Campus_Gallery_upload_controller.getImageCaptions);
router.put('/campus-life-gallery/:id',attachDb, Campus_Gallery_upload.single('image'), Campus_Gallery_upload_controller.updateImageCaption);
router.delete('/campus-life-gallery/:id',attachDb, Campus_Gallery_upload_controller.deleteImageCaption);








const event_gallery_controller = require('../controllers/centralAdmin/eventGallery.controller.js');

const event_gallery_upload = multer({ dest: 'uploads/event-gallery' });

router.post('/event-gallery', attachDb, event_gallery_upload.single('image'), event_gallery_controller.addEventGallery);
router.get('/event-gallery', attachDb, event_gallery_controller.getEventGallery);
router.put('/event-gallery/:id', attachDb, event_gallery_upload.single('image'), event_gallery_controller.updateEventGallery);
router.delete('/event-gallery/:id', attachDb, event_gallery_controller.deleteEventGallery);








const achievementController = require('../controllers/centralAdmin/achievementController');

router.post('/add-achievement', attachDb, achievementController.addAchievement);
router.get('/achievements', attachDb, achievementController.getAchievements);
router.put('/achievement/:id', attachDb, achievementController.updateAchievement);
router.delete('/achievement/:id', attachDb, achievementController.deleteAchievement);







const achievementCardController = require('../controllers/centralAdmin/achievementCardController');

router.post('/add-achievement-card', attachDb, achievementCardController.addAchievementCard);
router.get('/achievement-cards', attachDb, achievementCardController.getAchievementCards);
router.put('/achievement-card/:id', attachDb, achievementCardController.updateAchievementCard);
router.delete('/achievement-card/:id', attachDb, achievementCardController.deleteAchievementCard);









const sportsDataController = require('../controllers/centralAdmin/sportsDataController');

router.post('/add-sports-data', attachDb, sportsDataController.addSportsData);
router.get('/sports-data', attachDb, sportsDataController.getSportsData);
router.put('/sports-data/:id', attachDb, sportsDataController.updateSportsData);
router.delete('/sports-data/:id', attachDb, sportsDataController.deleteSportsData);





const sportsFacilityController = require('../controllers/centralAdmin/sportsFacilityController');

router.post('/add-sports-facility', attachDb, sportsFacilityController.addSportsFacility);
router.get('/sports-facilities', attachDb, sportsFacilityController.getSportsFacilities);
router.put('/sports-facility/:id', attachDb, sportsFacilityController.updateSportsFacility);
router.delete('/sports-facility/:id', attachDb, sportsFacilityController.deleteSportsFacility);








const facility_gallery_upload = multer({ dest: 'uploads/facility-gallery' });


const facilityGalleryController = require('../controllers/centralAdmin/facilityGalleryController');

router.post('/add-facility-gallery', attachDb, facility_gallery_upload.single('image'), facilityGalleryController.addFacilityGallery);
router.get('/facility-gallery', attachDb, facilityGalleryController.getFacilityGallery);
router.put('/facility-gallery/:id', attachDb, facility_gallery_upload.single('image'), facilityGalleryController.updateFacilityGallery);
router.delete('/facility-gallery/:id', attachDb, facilityGalleryController.deleteFacilityGallery);












const printMediaController = require('../controllers/centralAdmin/printMediaController');

const printMediaUpload = multer({ dest: 'uploads/print-media' });

router.post(
  '/add-print-media',
  attachDb,
  printMediaUpload.any(), // accept any field names
  printMediaController.addPrintMedia
);


router.get('/print-media', attachDb, printMediaController.getPrintMedia);

router.put(
  '/print-media/:id',
  attachDb,
  printMediaUpload.array('cards', 10),
  printMediaController.updatePrintMedia
);

router.delete('/print-media/:id', attachDb, printMediaController.deletePrintMedia);








const mediaGalleryController = require('../controllers/centralAdmin/mediaGalleryController');

const media_gallery_upload = multer({ dest: 'uploads/media-gallery' });

router.post('/add-media-gallery', attachDb, media_gallery_upload.single('image'), mediaGalleryController.addMediaGallery);
router.get('/media-gallery', attachDb, mediaGalleryController.getMediaGallery);
router.put('/media-gallery/:id', attachDb, media_gallery_upload.single('image'), mediaGalleryController.updateMediaGallery);
router.delete('/media-gallery/:id', attachDb, mediaGalleryController.deleteMediaGallery);













const membershipCommunityController = require('../controllers/centralAdmin/membershipCommunity.controller');

router.post('/add-membership-community', attachDb, membershipCommunityController.addMembershipCommunity);
router.get('/membership-community', attachDb, membershipCommunityController.getMembershipCommunities);
router.put('/membership-community/:id', attachDb, membershipCommunityController.updateMembershipCommunity);
router.delete('/membership-community/:id', attachDb, membershipCommunityController.deleteMembershipCommunity);














const contactDetailsController = require('../controllers/centralAdmin/contactDetails.controller');

router.post(
  '/add-contact-details',
  attachDb,
  contactDetailsController.addContactDetails
);

router.get(
  '/contact-details',
  attachDb,
  contactDetailsController.getContactDetails
);

router.put(
  '/update-contact-details/:id',
  attachDb,
  contactDetailsController.updateContactDetails
);

router.delete(
  '/delete-contact-details/:id',
  attachDb,
  contactDetailsController.deleteContactDetails
);


















































module.exports = router;