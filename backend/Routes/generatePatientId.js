const express = require("express");
const router = express.Router();
const User = require("../schema/user"); // Import your Mongoose model

// Define the hospital abbreviation
const hospitalAbbreviation = "ABC"; // Replace with the actual abbreviation

// Route to generate a unique patient ID
router.get("/", async (req, res) => {
  try {
    // Find the latest user with the "Patient" role
    const latestPatient = await User.findOne({ role: "Patient" }).sort({
      _id: -1,
    });

    let serialNumber = 1;

    // If a patient with the "Patient" role exists, generate the next serial number
    if (latestPatient && latestPatient.patientID) {
      // Check if latestPatient and patientID are defined
      // Extract the serial number from the patient ID
      const latestSerial = parseInt(latestPatient.patientID.split("-")[1]);
      serialNumber = latestSerial + 1;
    }

    // Generate a patient ID with the desired format
    const year = new Date().getFullYear();
    const patientID = `${hospitalAbbreviation}${year}${serialNumber
      .toString()
      .padStart(4, "0")}`;

    res.json({ patientID });
  } catch (error) {
    console.error("Error generating patient ID:", error); // Add this line for logging
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
