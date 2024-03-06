const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const StudentsModel = mongoose.model("students", StudentsSchema);

module.exports = StudentsModel;
