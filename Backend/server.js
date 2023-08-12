const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const studentsRoute = require("./routes/studentsRoute");

// --- middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// --- DB Connection ---
const dbConnection = async () => {
  try {
    await mongoose.connect(`mongodb://127.0.0.1:27017/StudentsDB`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB connect successfully");
  } catch (err) {
    console.log(`Error from DB connection ${err}`);
    res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

// --- GLOBAL ROUTE --
app.get("/", async (req, res) => {
  try {
    res.send("Server working well");
  } catch (error) {
    console.log(error.message);
  }
});
// --- STUDENTS ROUTE ---
app.use("/students", studentsRoute);

// --- SERVER LISTENING ---
app.listen(PORT, () => {
  console.log(`Server is running at PORT - ${PORT}`);
  dbConnection(); 
});
