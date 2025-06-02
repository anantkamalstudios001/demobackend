const getNoticeModel = require('../models/collegeadmin/noticeModel');
const getStaffModel = require('../models/collegeadmin/staffModel');
const getCollegeContactModel = require('../models/collegeadmin/collegeContactModel');
const getalumniModel = require('../models/collegeadmin/alumniModel');

function getModelByDepartment(department, type) {
  switch (type) {
    case 'notices':
      return getNoticeModel(department);
    case 'staff':
      return getStaffModel(department);
    case 'college_contact':
      return getCollegeContactModel(department);
    case 'alumni':
      return getalumniModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
  //   case 'college_contact':
  // return getCollegeContactModel(department);
    default:
      throw new Error('Unknown model type');
  }
}

module.exports = getModelByDepartment;
