const Students = require("../models/studentsModel");

// -- post method controller ---
exports.studentsAddToDB = async (req, res) => {
  try {
    const { name, address, phone } = req.body;
    const newStudent = new Students({
      name,
      address,
      phone,
    });
    const saveStudent = await newStudent.save();
    console.log(saveStudent);
    res.status(201).send({
      status: true,
      message: "Student Created .....",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error from Post method",
      serverError: error.message,
    });
  }
};

// --- get method controller
exports.getStudents = async (req, res) => {
  try {
    const allStudents = await Students.find({});
    res.status(200).send({
      allStudents,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error from get method",
      serverError: error.message,
    });
  }
};

// --- get by id ---
exports.getStudentsById = async (req, res) => {
  try {
    const id = req.params.id;
    const studentFindByID = await Students.findById(id).exec();
    res.status(200).send(studentFindByID);
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error from get by id method",
      serverError: error.message,
    });
  }
};

// --- update student ---
exports.updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateStudent = await Students.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updateStudent) {
      res.status(404).send({
        status: false,
        message: "Student not update",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "successfully update student",
        data: updateStudent,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error from Update method",
      serverError: error.message,
    });
  }
};

// --- delete student ---
exports.deleteStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStudent = await Students.findByIdAndDelete(id);
    if (!deleteStudent) {
      res.status(404).send({
        status: false,
        message: "Student not delete",
      });
    } else {
      res.status(200).send({
        status: true,
        message: "successfully delete student",
        data: deleteStudent,
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error from get by id method",
      serverError: error.message,
    });
  }
};
