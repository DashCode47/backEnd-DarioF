const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: String,
  grade1: Number,
  grade2: Number,
  grade3: Number,
  total: Number,
});

const subjectSchema = new mongoose.Schema({
  name: String,
  teacher: String,
  students: [studentSchema],
});

module.exports = mongoose.model("Subjects", subjectSchema);
