const express = require("express");
const router = express.Router();
const Patient = require("../schema/user"); // Assuming the schema for patients
const Doctor = require("../schema/doctorSchema"); // Assuming the schema for doctors
const HealthStaff = require("../schema/healthStaff"); // Assuming the schema for health staff
const Admin = require("../schema/adminSchema"); // Assuming the schema for admins
const jwt = require("jsonwebtoken");

// GET all users (patients, doctors, health staff, and admins)
router.get("/", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Authentication token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken.role !== "Admin") {
      return res.status(403).json({ error: "Insufficient role permissions." });
    }

    // Fetch all users (patients, doctors, health staff, admins) based on their collection
    const patients = await Patient.find();
    const doctors = await Doctor.find();
    const healthStaff = await HealthStaff.find(); // Fetch Health Staff users
    const admins = await Admin.find();

    const allUsers = [...patients, ...doctors, ...healthStaff, ...admins];
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

// POST assign role to a user
router.post("/admin/assign-role/:userId", async (req, res) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res.status(401).json({ error: "Authentication token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodedToken.role !== "Admin") {
      return res.status(403).json({ error: "Insufficient role permissions." });
    }

    const { role } = req.body;
    const userId = req.params.userId;

    // Determine which collection to update based on the role and update the role accordingly
    if (role === "Patient") {
      await Patient.findByIdAndUpdate(userId, { role }, { new: true });
    } else if (role === "Doctor") {
      await Doctor.findByIdAndUpdate(userId, { role }, { new: true });
    } else if (role === "Health Staff") {
      await HealthStaff.findByIdAndUpdate(userId, { role }, { new: true }); // Update Health Staff role
    } else if (role === "Admin") {
      await Admin.findByIdAndUpdate(userId, { role }, { new: true });
    }

    // Fetch all users (patients, doctors, health staff, admins) again and return as JSON
    const patients = await Patient.find();
    const doctors = await Doctor.find();
    const healthStaff = await HealthStaff.find();
    const admins = await Admin.find();

    const allUsers = [...patients, ...doctors, ...healthStaff, ...admins];
    res.json(allUsers);
  } catch (error) {
    console.error("Error assigning role:", error);
    res.status(500).json({ error: "An error occurred while assigning role" });
  }
});

// Delete patient
router.delete("/patients/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the patient from the Patient collection
    await Patient.findByIdAndDelete(userId);

    // Return a success message
    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    console.error("Error deleting patient:", error);
    res.status(500).json({ error: "An error occurred while deleting patient" });
  }
});

// Delete doctor
router.delete("/doctors/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the doctor from the Doctor collection
    await Doctor.findByIdAndDelete(userId);

    // Return a success message
    res.json({ message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    res.status(500).json({ error: "An error occurred while deleting doctor" });
  }
});

// Delete admin
router.delete("/admins/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the admin from the Admin collection
    await Admin.findByIdAndDelete(userId);

    // Return a success message
    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Error deleting admin:", error);
    res.status(500).json({ error: "An error occurred while deleting admin" });
  }
});

// Delete health staff
router.delete("/healthstaffs/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Delete the health staff from the HealthStaff collection
    await HealthStaff.findByIdAndDelete(userId);

    // Return a success message
    res.json({ message: "Health Staff deleted successfully" });
  } catch (error) {
    console.error("Error deleting health staff:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting health staff" });
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
