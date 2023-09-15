const express = require("express");
const router = express.Router();
const User = require("../schema/user");

// Define the hospital abbreviation
const hospitalAbbreviation = "ABC";

router.get("/", async (req, res) => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Find the highest patient ID in the database with the "Patient" role for the current year
    const highestPatient = await User.findOne({
      role: "Patient",
      patientID: { $regex: `^${hospitalAbbreviation}${currentYear}` },
    })
      .sort({ patientID: -1 })
      .select("patientID");

    let serialNumber = 1;

    if (highestPatient && highestPatient.patientID) {
      // Extract the serial number from the patient ID
      const latestSerial = parseInt(
        highestPatient.patientID.split(currentYear)[1]
      );

      if (!isNaN(latestSerial)) {
        serialNumber = latestSerial + 1;
      }
    }

    console.log("serial number:", serialNumber);

    // Generate a patient ID with the desired format
    const paddedSerialNumber = serialNumber.toString().padStart(4, "0");
    
    console.log("padded serial number:", paddedSerialNumber);
    const patientID = `${hospitalAbbreviation}${currentYear}${paddedSerialNumber}`;

    res.json({ patientID });
  } catch (error) {
    console.error("Error generating patient ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
