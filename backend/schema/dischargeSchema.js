const mongoose = require('mongoose');

const dischargeSchema = new mongoose.Schema({
  dischargeDate: { type: Date, required: true },
  dischargeTime: { type: String, required: true },
  dischargeSummary: { type: String, required: true },
  dischargeMedication: { type: String, required: true },
});

const Discharge = mongoose.model('Discharge', dischargeSchema);

module.exports = Discharge;
