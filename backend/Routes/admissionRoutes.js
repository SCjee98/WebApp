const express = require("express");
const router = express.Router();
const Admission = require("../schema/admissionSchema");
const User = require("../schema/user"); // Import the user schema

const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
    if (err) {
      return res
        .status(403)
        .json({ error: "Authentication failed. Token invalid." });
    }

    req.user = decodedToken;
    next();
  });
};

// API route to save Admission form data
router.post("/", async (req, res) => {
  try {
    const admissionData = req.body;

    // Create a new admission record in the database
    const newAdmission = await Admission.create(admissionData);

    res.status(201).json(newAdmission); // Return the newly created admission record
  } catch (error) {
    console.error("Error submitting admission form:", error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting admission form" });
  }
});

module.exports = router;
