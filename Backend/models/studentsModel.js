const mongoose = require("mongoose");

// --- SCHEMA MAKE FOR STUDENTS
const studentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

// --- MODEL MAKE ---
const Students = mongoose.model("studentsCollections", studentsSchema);

module.exports = Students;
