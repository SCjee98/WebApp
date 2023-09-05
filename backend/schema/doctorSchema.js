const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  contactNumber: { type: String, required: true },
  role: {
    type: String,
    default: "Pending",
    enum: ["Pending", "pending", "Doctor"],
  },
  // ... other doctor-specific fields
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
