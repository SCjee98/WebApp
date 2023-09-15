const express = require("express");
const router = express.Router();
const User = require("../schema/user"); // Import your User schema/model

router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const patient = await User.findById(userId);
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    res.json(patient);
  } catch (error) {
    console.error("Error fetching patient details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patient details" });
  }
});

router.put("/edit-patient/:id", async (req, res) => {
  try {
    console.log("router working");
    const userId = req.params.id;
    const updates = req.body; // Update object containing the fields to be updated

    const updatedPatient = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true } // Return the updated patient details
    );

    if (!updatedPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating patient details" });
  }
});

module.exports = router;
