const Patient = require('../models/patientModel');
const Report = require('../models/reportModel');

// Register a new patient
exports.register = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    // Check if the patient already exists
    let patient = await Patient.findOne({ phoneNumber });

    // If the patient exists, return their information
    if (patient) {
      return res.status(200).json({message: 'Patient Already registered', patient });
    }

    // Create a new patient
    patient = new Patient({ phoneNumber });
    await patient.save();

    res.status(201).json({ message: 'Patient registered successfully', patient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a report for a patient
exports.createReport = async (req, res) => {
  try {
    const { id } = req.params;
    const { createdBy, status } = req.body;

    // Check if the patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Create a new report
    const newReport = new Report({patientId:id, createdBy, status });
    await newReport.save();

     // Initialize the reports array if not already present
     patient.reports = patient.reports || [];

    // Add the report to the patient's records
    patient.reports.push(newReport);
    await patient.save();

    res.status(201).json({ message: 'Report created successfully', report: newReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all reports of a patient
exports.getAllReports = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the patient exists
    const patient = await Patient.findById(id).populate('reports');
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.status(200).json({ reports: patient.reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
