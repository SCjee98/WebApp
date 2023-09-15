const express = require('express');
const router = express.Router();
const Doctor = require('../schema/doctorSchema');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, specialization, registrationNumber, contactNumber } = req.body;

    // Validate specialization, registrationNumber, and other fields
    const errors = {};
    let isValid = true;

    if (!specialization) {
      errors.specialization = 'Please enter specialization.';
      isValid = false;
    }

    if (!registrationNumber) {
      errors.registrationNumber = 'Please enter registration number.';
      isValid = false;
    }

    // More validations ...

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // Check if doctor already exists with the provided email or registration number
    const existingDoctor = await Doctor.findOne({ $or: [{ email }, { registrationNumber }] });
    if (existingDoctor) {
      return res.status(400).json({ error: 'Doctor with this email or registration number already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new doctor document
    const newDoctor = new Doctor({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      specialization,
      registrationNumber,
      contactNumber,
      role: "Doctor",
      // ... other doctor-specific fields
    });

    await newDoctor.save();

    // Send a success response
    res.json({ message: 'Doctor registration successful' });
  } catch (error) {
    console.error('An error occurred during doctor registration:', error);
    res.status(500).json({ error: 'An error occurred during doctor registration. Please try again later.' });
  }
});

module.exports = router;
