const { Router } = require("express");

const {
  getSubjects,
  saveSubjects,
  deleteSubject,
  updateSubject,
} = require("../controllers/SubjectControllers");

const router = Router();

router.get("/student", getSubjects);
router.post("/student/save", saveSubjects);
router.put("/student/update/:id", updateSubject);
router.get("/student/delete/:id", deleteSubject);

module.exports = router;
