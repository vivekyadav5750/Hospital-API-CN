const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
