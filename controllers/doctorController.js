const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');
const config = require('../config');
const bcrypt = require('bcrypt');

// Register a new doctor
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username is already registered
    const existingDoctor = await Doctor.findOne({ username });
    if (existingDoctor) {
      return res.status(409).json({ error: 'User is already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new doctor with hashed password
    const newDoctor = new Doctor({ username, password: hashedPassword });
    await newDoctor.save();

    res.status(201).json({ message: 'Doctor registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login for a doctor
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the doctor by username
    const doctor = await Doctor.findOne({ username });

    // Check if the doctor exists
    if (!doctor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, doctor.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create and return a JWT token
    const token = jwt.sign({ id: doctor._id, username: doctor.username }, config.secretKey, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

