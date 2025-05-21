const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files for all subdomains and adminpanel
app.use((req, res, next) => {
  const host = req.headers.host;

  if (
    // host.startsWith('pharmacy.') ||
    // host.startsWith('iti.') ||
    host.startsWith('engineering.')
    // host.startsWith('bed.')
    // host.startsWith('polytechnic.')
    // host.startsWith('mba.')
  ) { 
  express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('pharmacy.')) {
    express.static(path.join(__dirname, 'pharmacy', 'college'))(req, res, next);
  } else if (host.startsWith('mba.')) {
    express.static(path.join(__dirname, 'mba', 'college'))(req, res, next);
  } else if (host.startsWith('polytechnic.')) {
    express.static(path.join(__dirname, 'polytechnic', 'college'))(req, res, next);
  } else if (host.startsWith('bed.')) {
    express.static(path.join(__dirname, 'bed', 'college'))(req, res, next);
  } else if (host.startsWith('iti.')) {
    express.static(path.join(__dirname, 'iti', 'college'))(req, res, next);
  // } else if (host.startsWith('polytechnic.')) {
  //   express.static(path.join(__dirname, 'polytechnic', 'college'))(req, res, next);
  // }

  //  else if (host.startsWith('mba.')) {
  //   express.static(path.join(__dirname, 'mba', 'college'))(req, res, next);
  // } else if (host.startsWith('mba.')) {
  //   express.static(path.join(__dirname, 'mba', 'college'))(req, res, next);
  } 
   else if (host.startsWith('publicschool.')) {
    express.static(path.join(__dirname, 'publicschool','school'))(req, res, next);
  }  else if (host.startsWith('adminpanel.')) {
    express.static(path.join(__dirname, 'dist', 'smart', 'browser'))(req, res, next);
  } else if (host.startsWith('centraladmin.')) { 
    express.static(path.join(__dirname, 'centraladmin', 'centraladmin', 'browser'))(req, res, next);
  }
    else
  {
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
    // host.startsWith('iti.') ||
    host.startsWith('engineering.')
    // host.startsWith('bed.')
    // host.startsWith('polytechnic.')
    // host.startsWith('mba.')
  ) {
    res.sendFile(path.join(__dirname, 'engineering', 'browser', 'index.html'));
  } else if (
    host.startsWith('pharmacy.')
  ) {
    res.sendFile(path.join(__dirname,'pharmacy', 'college', 'index.html'));
  }else if (
    host.startsWith('mba.')
  ) {
    res.sendFile(path.join(__dirname,'mba', 'college', 'index.html'));
  }else if (
    host.startsWith('polytechnic.')
  ) {
    res.sendFile(path.join(__dirname,'polytechnic', 'college', 'index.html'));
  } else if (
    host.startsWith('bed.')
  ) {
    res.sendFile(path.join(__dirname,'bed','college', 'index.html'));
  } else if (
    host.startsWith('iti.')
  ) {
    res.sendFile(path.join(__dirname,'iti','college', 'index.html'));
  // } else if (
  //   host.startsWith('publicschool.')
  // ) {
  //   res.sendFile(path.join(__dirname,'school', 'index.html'));
  // } else if (
  //   host.startsWith('publicschool.')
  // ) {
  //   res.sendFile(path.join(__dirname,'school', 'index.html'));
  } else if (
    host.startsWith('publicschool.')
  ) {
    res.sendFile(path.join(__dirname,'publicschool','school', 'index.html'));
  } else if (
    host.startsWith('centraladmin.')
  ) {
    res.sendFile(path.join(__dirname,'centraladmin', 'centraladmin', 'browser',  'index.html'));
  } else if (
    host.startsWith('publicschool.')
  ) {
    res.sendFile(path.join(__dirname,'school', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'university', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
