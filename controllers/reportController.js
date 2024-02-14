const Report = require('../models/reportModel');
const Patient = require('../models/patientModel');

// Get all reports filtered by status
exports.getReportsByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    // Check if the provided status is valid
    const validStatuses = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    // Find all reports with the specified status
    const reports = await Report.find({ status });

    res.status(200).json({ reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


