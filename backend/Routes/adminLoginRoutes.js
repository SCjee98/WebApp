// adminLoginRoutes.js
const express = require('express');
const router = express.Router();
const Admin = require('../schema/adminSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin with the provided email
    const admin = await Admin.findOne({ email });

    // Check if the admin exists
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, admin.password);

    // Check if the passwords match
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Passwords match, admin is authenticated

    // Generate a token
    const token = jwt.sign({ userId: admin._id, role: 'Admin' }, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });

    // Return the token to the client
    res.json({ token });

  } catch (error) {
    console.error('Admin Login Error:', error);
    res.status(500).json({ error: 'An error occurred during admin login. Please try again later.' });
  }
});

module.exports = router;
