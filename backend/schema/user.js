//user registration data schema
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
    match: /^\d{10}$/,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Pending",
    enum: ["Pending", "pending", "Patient"],
  },
  patientID: {
    type: String, // You can specify any additional configuration you need here
    unique: true, // Ensure that patientIDs are unique
    required: true, // Make it required
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
