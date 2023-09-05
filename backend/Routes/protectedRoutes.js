// routes/protectedRoutes.js
const express = require('express');
const router = express.Router();
const authenticateRole = require('../middleware/authenticateRole'); // Import the authenticateRole middleware

// Protected route that requires the "admin" role
router.get('/admin/dashboard', authenticateRole('Admin'), (req, res) => {
  // Handle admin dashboard logic
});

// Protected route that requires the "doctor" role
router.get('/doctor/dashboard', authenticateRole('Doctor'), (req, res) => {
  // Handle doctor dashboard logic
});

// Protected route that requires the "patient" role
router.get('/patient/dashboard', authenticateRole('Patient'), (req, res) => {
  // Handle patient dashboard logic
});

module.exports = router;
