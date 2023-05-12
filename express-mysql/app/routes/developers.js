const express = require("express");
const router = express.Router();
const model = require("../db/model");

// function isBodyValid(req) {
//   return (
//     req.body.id_type != "" &&
//     req.body.id_type != null &&
//     req.body.id_value != "" &&
//     req.body.id_value != null &&
//     req.body.name != "" &&
//     req.body.name != null &&
//     req.body.lastname != "" &&
//     req.body.lastname != null &&
//     req.body.area != "" &&
//     req.body.area != null &&
//     req.body.age != "" &&
//     req.body.age != null
//   );
// }
function isBodyValid(req) {
  return (
    req.body.id_estudiante != "" &&
    req.body.id_estudiante != null &&
    req.body.id_materia != "" &&
    req.body.id_materia != null &&
    req.body.calificacion != "" &&
    req.body.calificacion != null &&
    req.body.calificacion >= 0 &&
    req.body.calificacion <= 100
  );
}

router.get("/Estudiantes", (req, res) => {
  model.getAllEstudiantes(req, res);
});

router.get("/Materias", (req, res) => {
  model.getAllMaterias(req, res);
});

router.get("/Estudiantes/:id", (req, res) => {
  let id = req.params.id;

  model.getEstudianteByIdParams(req, res, id);
});

router.get("/Materias/:id", (req, res) => {
  let id = req.params.id;

  model.getMateriaByIdParams(req, res, id);
});

router.post("/crearEstudianteMateria", (req, res) => {

  if (isBodyValid(req) == false) {
    console.log("Body parameters must have valid values");
    res
      .status(404)
      .json({"message":"Body parameters must have valid values"});
    return;
  }
  if (parseInt(req.body.calificacion) >= 70) {
      req.body.estado = 1
  }else{
    req.body.estado = 0
  }

  model.createMateriaEstudiante(req, res);
});

router.get("/materiasAprobadasPorEstudiante/:id", (req, res) => {
  let id = req.params.id;

  model.getMateriasAprobadas(req, res, id);
});

router.get("/materiasReprobadasPorEstudiante/:id", (req, res) => {
  let id = req.params.id;

  model.getMateriasReprobadas(req, res, id);
});

router.get("/materiasPorEstudiante/:id", (req, res) => {
  let id = req.params.id;

  model.getAllMateriasByEstudiante(req, res, id);
});

// router.put("/Estudiantes/:id_type/:id_value", (req, res) => {
//   let idType = req.params.id_type;
//   let idValue = req.params.id_value;

//   if (isBodyValid(req) == false) {
//     console.log("Body parameters must have valid values");
//     res
//       .status(404)
//       .json({"message":"Body parameters must have valid values"});
//     return;
//   }

//   if (idType != req.body.id_type || idValue != req.body.id_value) {
//     console.log("Path and body parameters did not match");
//     res
//       .status(404)
//       .json({"message":"Path and body parameters did not match"});
//     return;
//   }

//   model.updateDeveloper(req, res);
// });

// router.delete("/Estudiantes/:id_type/:id_value", (req, res) => {
//   let idType = req.params.id_type;
//   let idValue = req.params.id_value;

//   model.deleteDeveloper(req, res, idType, idValue);
// });

module.exports = router;
