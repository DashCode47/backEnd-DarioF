const { Router } = require("express");

const {
  getStudents,
  saveStudents,
  deleteStudent,
  updateStudents,
} = require("../controllers/StudentControllers");

const router = Router();

router.get("/get", getStudents);
router.post("/save", saveStudents);
router.put("/update/:id", updateStudents);
router.get("/delete/:id", deleteStudent);

module.exports = router;
