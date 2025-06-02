const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// DB connection
const connectDB = require('./config/db.js');
connectDB();

// CORS setup
app.use(cors({
  origin: ['http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-department']
}));

// JSON body parser
app.use(express.json());

// Serve uploads folder
app.use('/uploads', express.static('uploads'));

// ===== Serve static files by subdomain =====
app.use((req, res, next) => {
  const host = req.headers.host;
  let staticPath = '';

  if (host.startsWith('engineering.')) staticPath = 'engineering/browser';
  else if (host.startsWith('pharmacy.')) staticPath = 'pharmacy/college';
  else if (host.startsWith('mba.')) staticPath = 'mba/college';
  else if (host.startsWith('polytechnic.')) staticPath = 'polytechnic/college';
  else if (host.startsWith('bed.')) staticPath = 'bed/college';
  else if (host.startsWith('iti.')) staticPath = 'iti/college';
  else if (host.startsWith('publicschool.')) staticPath = 'publicschool/school';
  else if (host.startsWith('adminpanel.')) staticPath = 'dist/smart/browser';
  else if (host.startsWith('centraladmin.')) staticPath = 'centraladmin/centraladmin/browser';
  else staticPath = 'university/college';

  express.static(path.join(__dirname, staticPath))(req, res, next);
});

// ===== API Routes =====
const collegeadminRoutes = require('./collegeadminroutes/collegeAdminRoutes.js');
const CentralAdminRoutes = require('./centraladminoutes/CentralAdminRoutes.js');

app.use('/api/collegeadmin', collegeadminRoutes);
app.use('/api/centraladmin', CentralAdminRoutes);

// ===== Frontend fallback (index.html) =====
app.get('*', (req, res) => {
  const host = req.headers.host;
  let indexPath = '';

  if (host.startsWith('engineering.')) indexPath = 'engineering/browser/index.html';
  else if (host.startsWith('pharmacy.')) indexPath = 'pharmacy/college/index.html';
  else if (host.startsWith('mba.')) indexPath = 'mba/college/index.html';
  else if (host.startsWith('polytechnic.')) indexPath = 'polytechnic/college/index.html';
  else if (host.startsWith('bed.')) indexPath = 'bed/college/index.html';
  else if (host.startsWith('iti.')) indexPath = 'iti/college/index.html';
  else if (host.startsWith('publicschool.')) indexPath = 'publicschool/school/index.html';
  else if (host.startsWith('adminpanel.')) indexPath = 'dist/smart/browser/index.html';
  else if (host.startsWith('centraladmin.')) indexPath = 'centraladmin/centraladmin/browser/index.html';
  else indexPath = 'university/college/index.html';

  res.sendFile(path.join(__dirname, indexPath));
});

// ===== Start server =====
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
