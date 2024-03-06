const StudentModel = require("../models/StudentsModel");

module.exports.getStudents = async (req, res) => {
  const students = await StudentModel.find();
  res.send(students);
};

module.exports.saveStudents = async (req, res) => {
  console.log("req", req.body);
  const {
    name,
    email,
    age,
    apellido,
    calle_2,
    ciudad,
    codigo_postal,
    contraseña,
    correo,
    direccion,
    id_usuario,
    nombre,
    provincia,
    rol,
    materia,
  } = req.body;

  StudentModel.create({
    name,
    email,
    age,
    apellido,
    calle_2,
    ciudad,
    codigo_postal,
    contraseña,
    correo,
    direccion,
    id_usuario,
    nombre,
    provincia,
    rol,
    materia,
  })
    .then((data) => {
      console.log("saved ");
      res.status(201).send("OK");
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};

module.exports.updateStudents = async (req, res) => {
  console.log("req", req);
  const { id } = req.params;
  const {
    name,
    email,
    age,
    apellido,
    calle_2,
    ciudad,
    codigo_postal,
    contraseña,
    correo,
    direccion,
    id_usuario,
    nombre,
    provincia,
    rol,
    materia,
  } = req.body;

  StudentModel.findByIdAndUpdate(id, {
    name,
    email,
    age,
    apellido,
    calle_2,
    ciudad,
    codigo_postal,
    contraseña,
    correo,
    direccion,
    id_usuario,
    nombre,
    provincia,
    rol,
    materia,
  })
    .then(() => res.send("updated succesfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};

module.exports.deleteStudent = async (req, res) => {
  console.log("PARAMS", params);
  const { id } = req.params;

  StudentModel.findByIdAndDelete(id)
    .then(() => res.send("Deleted succesfully"))
    .catch((err) => {
      console.log(err);
      res.send({ error: err, msg: "something went wrong" });
    });
};
