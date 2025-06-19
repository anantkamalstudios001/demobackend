// utils/getModelForCollege.js
const mongoose = require('mongoose');
const academicsOverviewSchema = require('../models/collegeAdmin/academicsOverviewSchema');

const modelCache = {};

function getAcademicOverviewModel(collegeDbName) {
  const db = mongoose.connection.useDb(collegeDbName, { useCache: true });

  if (!modelCache[collegeDbName]) {
    modelCache[collegeDbName] = db.model('AcademicsOverview', academicsOverviewSchema);
  }

  return modelCache[collegeDbName];
}

module.exports = getAcademicOverviewModel;
