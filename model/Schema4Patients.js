const mongoose = require("mongoose");

const PatientSchema = mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  date: String,
  doctor_name: String,
});

const Patients = mongoose.model("patients", PatientSchema);
module.exports = Patients;
