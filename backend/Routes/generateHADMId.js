const express = require("express");
const router = express.Router();
const Admission = require("../schema/admissionSchema"); // Assuming you have an "Admission" schema

// Define the hospital abbreviation
const hospitalAbbreviation = "HADM";

router.get("/", async (req, res) => {
  try {
    const patientId = req.query.patientId;

    // Find the highest serial number for the specified patientId
    const highestAdmission = await Admission.findOne({ patientId })
      .sort({ hospitalAdmissionId: -1 })
      .select("hospitalAdmissionId");

    let serialNumber = 1;

    if (highestAdmission && highestAdmission.hospitalAdmissionId) {
      const latestSerial = parseInt(
        highestAdmission.hospitalAdmissionId.split(hospitalAbbreviation)[1]
      );

      if (!isNaN(latestSerial)) {
        serialNumber = latestSerial + 1;
      }
    }

    const paddedSerialNumber = serialNumber.toString().padStart(4, "0");
    const hospitalAdmissionId = `${hospitalAbbreviation}${paddedSerialNumber}`;

    res.json({ hospitalAdmissionId });
  } catch (error) {
    console.error("Error generating HADMId:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
