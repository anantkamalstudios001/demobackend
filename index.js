const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 80;

// Serve different Angular apps based on subdomain
app.use((req, res, next) => {
  const host = req.headers.host;

  if (host.startsWith('bed.')) {
    express.static(path.join(__dirname, 'dist', 'bed', 'browser'))(req, res, next);
  } else if (host.startsWith('engineering.')) {
    express.static(path.join(__dirname, 'engineering', 'browser'))(req, res, next);
  } else if (host.startsWith('iti.')) {
    express.static(path.join(__dirname, 'dist', 'iti', 'browser'))(req, res, next);
  } else if (host.startsWith('mba.')) {
    express.static(path.join(__dirname, 'dist', 'mba', 'browser'))(req, res, next);
  } else {
    // Default: main site (anantkamalserver.site)
    express.static(path.join(__dirname, 'dist','smart', 'browser'))(req, res, next);
  }
});

// Handle SPA routing
app.get('*', (req, res) => {
  const host = req.headers.host;

  if (host.startsWith('bed.')) {
    res.sendFile(path.join(__dirname, 'dist', 'bed', 'browser', 'index.html'));
  } else if (host.startsWith('engineering.')) {
    res.sendFile(path.join(__dirname, 'engineering', 'browser', 'index.html'));
  } else if (host.startsWith('iti.')) {
    res.sendFile(path.join(__dirname, 'dist', 'iti', 'browser', 'index.html'));
  } else if (host.startsWith('mba.')) {
    res.sendFile(path.join(__dirname, 'dist', 'mba', 'browser', 'index.html'));
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'smart', 'browser', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
