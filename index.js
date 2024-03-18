const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config;

const routes = require("./routes/StudentsRoute");
const routesSub = require("./routes/SubjectsRoute");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({
  origin:"http://192.168.56.1:3000"
}));
// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://schooldb:schooldb.1@clusterschool.13hbqfh.mongodb.net/CRUD_DB?retryWrites=true&w=majority&appName=ClusterSchool"
  )
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("err", err));

app.use("/api", routes);
app.use("/api", routesSub);
// app.get("/", (req, res) => {
//   StudentModel.find()
//     .then((students) => res.json(students))
//     .catch((err) => res.json(err));
// });

app.listen(3000, () => console.log("Server listening on port 3000"));
