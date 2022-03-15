const express = require("express");
const Patients = require("../model/Schema4Patients");
const routerp = express.Router();
require("../db/conn");
routerp.get("/Patients", async (req, res) => {
  try {
    let pat = await Patients.find();
    res.json(pat);
  } catch (error) {
    res.json({ message: error.message });
  }
});
routerp.post("/addpatient", async (req, res) => {
  const { name, phone, address, date, doctor_name } = req.body;
  const newpat = new Patients({
    name,
    phone,
    address,
    date,
    doctor_name,
  });

  try {
    await newpat.save();
    res.json(newpat);
    res.status(801).json({ message: "patient add  succesfully" });
  } catch (error) {
    res.json({ message: error.message });
  }
});

module.exports = routerp;
