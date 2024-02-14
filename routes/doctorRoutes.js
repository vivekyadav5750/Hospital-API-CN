const express = require('express');
const doctorController = require('../controllers/doctorController');
const auth = require('../utils/auth');

const router = express.Router();

router.post('/register', doctorController.register);
router.post('/login', doctorController.login);

// Add other doctor routes as needed, protected with authentication if required

module.exports = router;
