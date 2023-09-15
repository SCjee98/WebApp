const express = require("express");
const router = express.Router();
const User = require("../schema/user"); // Import the user schema
const jwt = require("jsonwebtoken");

// GET all patients (users with role "Patient")
router.get("/patients", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Authentication token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken.role !== "Doctor") {
      return res.status(403).json({ error: "Insufficient role permissions." });
    }

    // Fetch all users with role "Patient"
    const patients = await User.find({ role: "Patient" });
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patients" });
  }
});

router.post("/logout", (req, res) => {
  try {
    // Clear the authorization token on the client-side
    res.clearCookie("jwtToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "An error occurred while logging out" });
  }
});

module.exports = router;
