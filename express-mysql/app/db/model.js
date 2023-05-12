const dbConn = require("../config/db.config");

const model = {
  getAllEstudiantes(req, res) {
    const queryString = "SELECT * FROM Estudiantes";
    dbConn.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).end();
        return;
      }
      res.status(200).json(rows);
    });
  },

  getAllMaterias(req, res) {
    const queryString = "SELECT * FROM Materias";
    dbConn.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).end();
        return;
      }
      res.status(200).json(rows);
    });
  },

  getEstudianteByIdParams(req, res, id, idValue) {
    const queryString =
      "SELECT * FROM Estudiantes WHERE (id = ?)";

    dbConn.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).send('{"message":"Failed to query}');
        return;
      }
      res.status(200).json(rows);
    });
  },

  getMateriaByIdParams(req, res, id, idValue) {
    const queryString =
      "SELECT * FROM Materias WHERE (id = ?)";

    dbConn.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).send('{"message":"Failed to query}');
        return;
      }
      res.status(200).json(rows);
    });
  },

  createMateriaEstudiante(req, res) {
    let queryString =
      "SELECT * FROM Estudiantes_Materias WHERE (id_estudiante = ? AND id_materia = ?)";

    dbConn.query(
      queryString,
      [req.body.id_estudiante, req.body.id_materia],
      (err1, rows1, fields1) => {
        if (err1) {
          console.log("Failed to query, err1: ", err1);
          res.status(404).send('{"message":"Failed to query}');
          return;
        }
        if (rows1 && rows1.length) {
          console.log("Developer already exists.");
          res.status(404).send('{"message":"El estudiante ya tiene esta materia"}');
          return;
        }

        queryString =
          "INSERT INTO Estudiantes_Materias (id_estudiante, id_materia, calificacion, estado) VALUES (?, ?, ?, ?)";
        dbConn.query(
          queryString,
          [
            req.body.id_estudiante,
            req.body.id_materia,
            req.body.calificacion,
            req.body.estado
          ],
          (err2, rows2, fields2) => {
            if (err2) {
              console.log("Failed to query, err2: ", err2);
              res.status(404).send();
              return;
            }
            res.status(200).json(rows2);
          }
        );
      }
    );
  },

  getMateriasAprobadas(req, res, id, idValue) {
    const queryString =
      `SELECT Estudiantes.name AS Nombre, Estudiantes.lastname AS Apellido, Materias.nombre As Materia, Estudiantes_Materias.calificacion AS Calificacion FROM Estudiantes 
      JOIN  Estudiantes_Materias ON Estudiantes.id=Estudiantes_Materias.id_estudiante 
      JOIN Materias ON Estudiantes_Materias.id_materia=Materias.id WHERE (Estudiantes.id = ? AND Estudiantes_Materias.estado = 1)`;

    dbConn.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).send('{"message":"Failed to query}');
        return;
      }
      res.status(200).json(rows);
    });
  },
  getMateriasReprobadas(req, res, id, idValue) {
    const queryString =
      `SELECT Estudiantes.name AS Nombre, Estudiantes.lastname AS Apellido, Materias.nombre As Materia, Estudiantes_Materias.calificacion AS Calificacion FROM Estudiantes 
      JOIN  Estudiantes_Materias ON Estudiantes.id=Estudiantes_Materias.id_estudiante 
      JOIN Materias ON Estudiantes_Materias.id_materia=Materias.id WHERE (Estudiantes.id = ? AND Estudiantes_Materias.estado = 0)`;

    dbConn.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).send('{"message":"Failed to query}');
        return;
      }
      res.status(200).json(rows);
    });
  },

  getAllMateriasByEstudiante(req, res, id, idValue) {
    const queryString =
      `SELECT Estudiantes.name AS Nombre, Estudiantes.lastname AS Apellido, Materias.nombre As Materia, Estudiantes_Materias.calificacion AS Calificacion FROM Estudiantes 
      JOIN  Estudiantes_Materias ON Estudiantes.id=Estudiantes_Materias.id_estudiante 
      JOIN Materias ON Estudiantes_Materias.id_materia=Materias.id WHERE (Estudiantes.id = ?)`;

    dbConn.query(queryString, [id], (err, rows, fields) => {
      if (err) {
        console.log("Failed to query, err: ", err);
        res.status(404).send('{"message":"Failed to query}');
        return;
      }
      res.status(200).json(rows);
    });
  },

  // createDeveloper(req, res) {
  //   let queryString =
  //     "SELECT * FROM Estudiantes WHERE (id_type = ? AND id_value = ?)";

  //   dbConn.query(
  //     queryString,
  //     [req.body.id_type, req.body.id_value],
  //     (err1, rows1, fields1) => {
  //       if (err1) {
  //         console.log("Failed to query, err1: ", err1);
  //         res.status(404).send('{"message":"Failed to query}');
  //         return;
  //       }
  //       if (rows1 && rows1.length) {
  //         console.log("Developer already exists.");
  //         res.status(404).send('{"message":"Developer already exists"}');
  //         return;
  //       }

  //       queryString =
  //         "INSERT INTO Estudiantes (id_type, id_value, name, lastname, area, age) VALUES (?, ?, ?, ?, ?, ?)";
  //       dbConn.query(
  //         queryString,
  //         [
  //           req.body.id_type,
  //           req.body.id_value,
  //           req.body.name,
  //           req.body.lastname,
  //           req.body.area,
  //           req.body.age,
  //         ],
  //         (err2, rows2, fields2) => {
  //           if (err2) {
  //             console.log("Failed to query, err2: ", err2);
  //             res.status(404).send();
  //             return;
  //           }
  //           res.status(200).json(rows2);
  //         }
  //       );
  //     }
  //   );
  // },

  // updateDeveloper(req, res) {
  //   const queryString =
  //     "UPDATE Estudiantes SET name = ?, lastname = ?, area = ?, age = ? WHERE (id_type = ? AND id_value = ?)";

  //   dbConn.query(
  //     queryString,
  //     [
  //       req.body.name,
  //       req.body.lastname,
  //       req.body.area,
  //       req.body.age,
  //       req.body.id_type,
  //       req.body.id_value,
  //     ],
  //     (err, rows, fields) => {
  //       if (err) {
  //         console.log("Failed to query, err: ", err);
  //         res.status(404).send('{"message":"Failed to query}');
  //         return;
  //       }
  //       res.status(200).json(rows);
  //     }
  //   );
  // },

  // deleteDeveloper(req, res, idType, idValue) {
  //   const queryString =
  //     "DELETE FROM Estudiantes WHERE (id_type = ? AND id_value = ?)";

  //   dbConn.query(queryString, [idType, idValue], (err, rows, fields) => {
  //     if (err) {
  //       console.log("Failed to query, err: ", err);
  //       res.status(404).send('{"message":"Failed to query}');
  //       return;
  //     }
  //     res.status(200).json(rows);
  //   });
  // },
};

module.exports = model;
