const express = require("express");
const router = express.Router();
const User = require("../schema/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      dob,
      gender,
      contactNumber,
      address,
      patientID,
    } = req.body;

    // Validate gender
    if (
      !gender ||
      (gender !== "male" && gender !== "female" && gender !== "other")
    ) {
      return res.status(400).json({ error: "Invalid gender" });
    }

    // Perform validation of the registration data
    const errors = {};
    let isValid = true;

    // More validations ....

    if (!isValid) {
      return res.status(400).json({ errors });
    }

    // Check if the user already exists with the provided email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    // Hash the password before saving it to the database
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save the registration data to MongoDB
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      dob,
      gender: String(gender).toLowerCase(),
      contactNumber,
      address,
      role: "pending",
      patientID,
    });

    await newUser.save();

    // Send a success response
    res.json({
      message: "You have been registered. Please log in again. Thank you!",
    });
  } catch (error) {
    console.error("An error occurred during registration:", error);

    if (error.name === "ValidationError") {
      // Handle validation errors
      const errors = {};
      for (const field in error.errors) {
        errors[field] = error.errors[field].message;
      }
      return res.status(400).json({ errors });
    }

    return res
      .status(500)
      .json({
        error: "An error occurred during registration. Please try again later.",
      });
  }
});

module.exports = router;
