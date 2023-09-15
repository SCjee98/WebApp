const express = require('express');
const router = express.Router();
const Admin = require('../schema/adminSchema');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, password, adminCode, contactNumber } = req.body;

    // Validate adminCode and other fields
    const errors = {};
    let isValid = true;

    if (!adminCode) {
      errors.adminCode = 'Please enter admin code.';
      isValid = false;
    }

    // More validations ...

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // Check if admin already exists with the provided email
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin with this email already exists' });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new admin document
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      adminCode,
      contactNumber,
      // ... other admin-specific fields
    });

    await newAdmin.save();

    // Send a success response
    res.json({ message: 'Admin registration successful' });
  } catch (error) {
    console.error('An error occurred during admin registration:', error);
    res.status(500).json({ error: 'An error occurred during admin registration. Please try again later.' });
  }
});

module.exports = router;
