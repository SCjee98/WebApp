// doctorLoginRoutes.js
const express = require('express');
const router = express.Router();
const Doctor = require('../schema/doctorSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the doctor with the provided email
    const doctor = await Doctor.findOne({ email });

    // Check if the doctor exists
    if (!doctor) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, doctor.password);

    // Check if the passwords match
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Passwords match, doctor is authenticated

    // Generate a token
    const token = jwt.sign({ userId: doctor._id, role: 'Doctor' }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    // Return the token to the client
    res.json({ token });

  } catch (error) {
    console.error('Doctor Login Error:', error);
    res.status(500).json({ error: 'An error occurred during doctor login. Please try again later.' });
  }
});

module.exports = router;
