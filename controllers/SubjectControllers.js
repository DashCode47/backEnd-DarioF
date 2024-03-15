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

module.exports.getSubjectsMax = async (req, res) => {
  // Extract the subject ID from the request
  const { subjectId } = req.params;

  // Validate the presence of subjectId
  if (!subjectId) {
    return res.status(400).send({ message: "Missing subject ID" });
  }

  try {
    console.log(subjectId);
    // Find entries for the specified subject
    const entries = await SubjectModel.find({ _id: subjectId });
    // Check if entries were found
    if (!entries.length) {
      return res.status(404).send({ message: "No entries found for subject" });
    }

    const findMAxSummatory = () => {
      let maxVal = 0;
      let maxItem = null;
      entries[0]?.students.map((item) => {
        const summatory =
          (item?.grade1 || 0) +
          (item?.grade2 || 0) +
          (item?.grade3 || 0) +
          (item?.grade4 || 0) +
          (item?.grade5 || 0) +
          (item?.grade6 || 0) +
          (item?.grade7 || 0) +
          (item?.grade8 || 0);
        if (summatory > maxVal) {
          maxVal = summatory;
          maxItem = { maxVal, studentId: item.studentId };
        }
      });
      return maxItem;
    };

    const highest = findMAxSummatory();

    res.send(highest);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching grades" });
  }
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
