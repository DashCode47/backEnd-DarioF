const { Router } = require("express");

const {
  getSubjects,
  getSubjectsMax,
  getSubjectMin,
  saveSubjects,
  deleteSubject,
  updateSubject,
} = require("../controllers/SubjectControllers");

const router = Router();

router.get("/student", getSubjects);
router.get("/student/:subjectId", getSubjectsMax);
router.get("/student/min/:subjectId", getSubjectMin);
router.post("/student/save", saveSubjects);
router.put("/student/update/:id", updateSubject);
router.get("/student/delete/:id", deleteSubject);

module.exports = router;
