const SubjectModel = require("../models/SubjectModel");

module.exports.getSubjects = async (req, res) => {
  const subjects = await SubjectModel.find();
  res.send(subjects);
};

module.exports.saveSubjects = async (req, res) => {
  console.log("req", req.body);
  const { name, teacher, students } = req.body;
  const newSubject = new SubjectModel({
    name,
    teacher,
    students,
  });

  newSubject
    .save()
    .then((savedSubject) => {
      console.log("Subject saved:", savedSubject);
      res.status(201).send("OK");
    })
    .catch((err) => {
      console.error(err);
      res.send({ error: err, msg: "Something went wrong saving the subject" });
    });
};

module.exports.updateSubject = async (req, res) => {
  try {
    const studentData = req.body;
    const subjectId = req.params.id;

    // Validate subject ID presence and format (if desired)
    if (!subjectId) {
      return res.status(400).send({ error: "Invalid subject ID provided" });
    }
    const updatedSubject = await SubjectModel.findOneAndUpdate(
      { _id: subjectId },
      {
        $addToSet: { students: { $each: [studentData] } }, // Add new students while preserving existing ones
      },
      {
        new: true, // Return the updated document
        runValidators: true, // Validate updated data
        context: "query", // Ensure validators are run during update
      }
    );

    if (!updatedSubject) {
      return res.status(404).send({ error: "Subject not found" });
    }

    // Respond with success message and updated subject
    res.status(200).send({
      message: "Subject updated successfully",
      subject: updatedSubject,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Error updating subject" });
  }
};

module.exports.deleteSubject = async (req, res) => {
  console.log("PARAMS", params);
  const { id } = req.params;

  SubjectModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted succesfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};
