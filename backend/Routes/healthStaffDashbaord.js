const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Patient = require("../schema/user"); // Assuming the schema for patients

// // GET all patients
// router.get("/patients", async (req, res) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ error: "Authentication token not found." });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     if (decodedToken.role !== "Health Staff") {
//       return res.status(403).json({ error: "Insufficient role permissions." });
//     }

//     const patients = await Patient.find();
//     res.json(patients);
//   } catch (error) {
//     console.error("Error fetching patients:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while fetching patients" });
//   }
// });

// // GET patient by ID
// router.get("/patients/:id", async (req, res) => {
//   try {
//     const token = req.header("Authorization");

//     if (!token) {
//       return res.status(401).json({ error: "Authentication token not found." });
//     }

//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     if (decodedToken.role !== "Health Staff") {
//       return res.status(403).json({ error: "Insufficient role permissions." });
//     }

//     const patient = await Patient.findById(req.params.id);
//     res.json(patient);
//   } catch (error) {
//     console.error("Error fetching patient:", error);
//     res.status(500).json({ error: "An error occurred while fetching patient" });
//   }
// });

// module.exports = router;
// GET all patients
router.get("/patients", async (req, res) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Authentication token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decodedToken.role !== "Health Staff") {
      return res.status(403).json({ error: "Insufficient role permissions." });
    }

    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching patients" });
  }
});

module.exports = router;
