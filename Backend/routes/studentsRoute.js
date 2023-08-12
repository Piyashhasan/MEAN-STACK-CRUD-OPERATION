const express = require("express");
const {
  getStudents,
  studentsAddToDB,
  getStudentsById,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentsController");
const studentsRoute = express.Router();

// #POST
studentsRoute.post("/", studentsAddToDB);
  
// #GET
studentsRoute.get("/", getStudents);
studentsRoute.get("/:id", getStudentsById);

// #UPDATE
studentsRoute.patch("/:id", updateStudent);

// #DELETE
studentsRoute.delete("/:id", deleteStudent);

module.exports = studentsRoute;
