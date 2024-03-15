const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  studentId: String,
  grade1: Number,
  grade2: Number,
  grade4: Number,
  grade5: Number,
  grade6: Number,
  grade7: Number,
  grade8: Number,
  total: Number,
});

const subjectSchema = new mongoose.Schema({
  name: String,
  teacher: String,
  students: [studentSchema],
});

module.exports = mongoose.model("Subjects", subjectSchema);
