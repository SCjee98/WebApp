const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adminCode: { type: String, required: true },
  contactNumber: { type: String, required: true },
  role: { type: String, default: "Pending", enum: ["Pending", "Admin"] },
  // ... other admin-specific fields
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
