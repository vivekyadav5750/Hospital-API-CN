const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
reports: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report',
  },
],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
