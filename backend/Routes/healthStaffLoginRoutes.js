const express = require("express");
const router = express.Router();
const HealthStaff = require("../schema/healthStaff"); // Assuming the schema for health staff
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    // Extract the login data from req.body
    const { email, password } = req.body;
    console.log("Login Request:", email);

    // Find the health staff with the provided email
    const healthStaff = await HealthStaff.findOne({ email });

    // Check if the health staff exists
    if (!healthStaff) {
      console.log("Health Staff not found:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, healthStaff.password);

    // Check if the passwords match
    if (!passwordMatch) {
      console.log("Invalid password for:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Passwords match, health staff is authenticated

    // Generate a token
    // Generate a token with the role "healthStaff"
    const token = jwt.sign(
      { userId: healthStaff._id, role: "Health Staff" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );
    console.log("Generated Token:", token);

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      error: "An error occurred during login. Please try again later.",
    });
  }
});

module.exports = router;
