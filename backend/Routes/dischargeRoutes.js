const express = require("express");
const router = express.Router();
const Discharge = require("../schema/dischargeSchema");
const User = require("../schema/user"); // Import the user schema

router.post("/discharge/:patientId", async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const dischargeData = req.body;

    // Check if the patient with the given ID exists
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found." });
    }

    // Save the Discharge data to the database
    const newDischarge = new Discharge({
      ...dischargeData,
      patientId: patientId, // Associate the discharge data with the patient's ID
    });
    await newDischarge.save();

    res.json({
      success: true,
      message: "Discharge details saved successfully!",
    });
  } catch (error) {
    console.error("An error occurred during discharge form submission:", error);
    res.status(500).json({
      error:
        "An error occurred during discharge form submission. Please try again later.",
    });
  }
});

module.exports = router;
