const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 80;

// Serve static files for all subdomains
app.use((req, res, next) => {
  const host = req.headers.host;

  if (host.startsWith('pharmacy.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('iti.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('engineering.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('bed.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('polytechnic.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('mba.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('publicschool.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else {
    // Default: serve static files for the main site
    express.static(path.join(__dirname, 'dist', 'smart', 'browser'))(req, res, next);
  }
});

// Serve `index.html` for the root of main domain
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'smart', 'browser', 'index.html'));
});

// Handle SPA routing for all other paths
app.get('*', (req, res) => {
  const host = req.headers.host;

  
  let appDir;
  if (host.startsWith('bed.')) {
    appDir = 'bed';
  } else if (host.startsWith('engineering.')) {
    appDir = 'engineering';
  } else if (host.startsWith('iti.')) {
    appDir = 'iti';
  } else if (host.startsWith('mba.')) {
    appDir = 'mba';
  } else {
    appDir = 'smart';  // Default for the main site
  }

  res.sendFile(path.join(__dirname, 'dist', appDir, 'browser', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});