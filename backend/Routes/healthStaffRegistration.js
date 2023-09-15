const express = require("express");
const router = express.Router();
const HealthStaff = require("../schema/healthStaff"); // Assuming the schema for health staff
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  console.log("post method working");
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if health staff already exists with the provided email
    const existingHealthStaff = await HealthStaff.findOne({ email });
    if (existingHealthStaff) {
      return res
        .status(400)
        .json({ error: "Health Staff with this email already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create and save new health staff document
    const newHealthStaff = new HealthStaff({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      // ... other health staff-specific fields
    });

    await newHealthStaff.save();

    // Send a success response
    res.json({ message: "Health Staff registration successful" });
  } catch (error) {
    console.error("An error occurred during health staff registration:", error);
    res.status(500).json({
      error:
        "An error occurred during health staff registration. Please try again later.",
    });
  }
});

module.exports = router;
