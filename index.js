const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 80;

// Serve static files for all subdomains and adminpanel
app.use((req, res, next) => {
  const host = req.headers.host;

  if (
    host.startsWith('pharmacy.') ||
    host.startsWith('iti.') ||
    host.startsWith('engineering.') ||
    host.startsWith('bed.') ||
    host.startsWith('polytechnic.') ||
    host.startsWith('mba.') ||
    host.startsWith('publicschool.') ||
    host.startsWith('school.')
  ) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('school.')) {
    express.static(path.join(__dirname, 'school'))(req, res, next);
  } else if (host.startsWith('adminpanel.')) {
    express.static(path.join(__dirname, 'dist', 'smart', 'browser'))(req, res, next);
  } else {
    // Default for main domain (localhost)
    express.static(path.join(__dirname, 'university'))(req, res, next);
  }
});

// Serve university index.html for main localhost
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'university', 'index.html'));
});

// Serve adminpanel index
app.get('*', (req, res) => {
  const host = req.headers.host;

  if (host.startsWith('adminpanel.')) {
    res.sendFile(path.join(__dirname, 'dist', 'smart', 'browser', 'index.html'));
  } else if (
    host.startsWith('pharmacy.') ||
    host.startsWith('iti.') ||
    host.startsWith('engineering.') ||
    host.startsWith('bed.') ||
    host.startsWith('polytechnic.') ||
    host.startsWith('mba.') ||
    host.startsWith('publicschool.')
  ) {
    res.sendFile(path.join(__dirname, 'engineering', 'browser', 'index.html'));
  } else if (
    host.startsWith('school.')
  ) {
    res.sendFile(path.join(__dirname,'school', 'index.html'));
  }
  else {
    res.sendFile(path.join(__dirname, 'university', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
