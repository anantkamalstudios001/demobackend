const express = require('express');
const router = express.Router();
const WelcomeController = require('../controllers/welcome.controller');

router.post('/add', WelcomeController.createWelcomeMessage);

module.exports = router;
