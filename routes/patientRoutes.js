const express = require('express');
const patientController = require('../controllers/patientController');
const auth = require('../utils/auth');

const router = express.Router();

router.post('/register', patientController.register);
router.post('/create_report/:id',auth, patientController.createReport);
// List all the reports of a patient oldest to latest
router.get('/all_reports/:id',auth, patientController.getAllReports);

module.exports = router;
