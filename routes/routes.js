import express from "express";
import dateFormat from "dateformat";
const router = express.Router();


import conection from "../database/conection.js";

router.get("/", function (req, res) {
  let estados, usuarios, categorias;
  conection.query(
    "SELECT * FROM usuario ORDER BY nombre ASC",
    function (err, rows) {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Error" });
      }
      usuarios = rows;
      // console.log(usuarios);
      //res.render("index", {usuarios: usuarios});
    }
  );
  conection.query("SELECT * FROM estado", function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      estados = rows;
    }
  });
  conection.query("SELECT * FROM categoria", function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      categorias = rows;
      res.render("index", {
        usuarios: usuarios,
        categorias: categorias,
        estados: estados,
      });
    }
  });
});

router.get("/user/:id", function (req, res) {
  let f1,
    icon = [];
  const id = req.params.id;
  let id_tarea1 = [];
  let estados;
  let tareas;
  let usuario;
  conection.query(
    `SELECT usuario.* from usuario WHERE usuario.id = ${id}`,
    function (err, rows) {
      if (err) {
        console.log(err);
      }
      usuario = rows;
    }
  );
  conection.query(
    `SELECT tarea.*, categoria.color, categoria.nombre_categoria, estado.descripcion_estado FROM tarea INNER JOIN categoria ON tarea.id_categoria_t=categoria.id_categoria INNER JOIN estado ON tarea.id_estado_t=estado.id_estado WHERE tarea.id_usuario_t = ${id}`,
    function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        tareas = rows;
        f1 = [];
        tareas.forEach((tareas) => {
          tareas.fecha_fin;
          f1.push(tareas.fecha_fin);
        });
      }
    }
  );
  conection.query(`SELECT * FROM estado `, function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      estados = rows;
      let fecha_actual = new Date();
      for (let i = 0; i < f1.length; i++) {
        if (fecha_actual >= f1[i]) {
          tareas[i]["color_i"] = "#ff5470";
        } else {
          tareas[i]["color_i"] = "#2cb67d";
        }
      }
      for (let j = 0; j < tareas.length; j++) {
        tareas[j].fecha_fin = dateFormat(tareas[j].fecha_fin, "isoDate");
        tareas[j].fecha_inicio = dateFormat(tareas[j].fecha_inicio, "isoDate");
      }
      res.status(200).render("tareas", {
        usuario: usuario,
        tareas: tareas,
        estados: estados,
        icon: icon,
      });
      //console.log(tareas);
    }
  });
});

router.post("/user/delete/:id", function (req, res) {
  const {id} = req.params;
  conection.query(
    `DELETE FROM tarea WHERE id_usuario_t = ${id} `,
    function (err) {
      if (err) {
        res.status(404).send('no found')
        console.log(err);
      } else {
        res.redirect("/");
        conection.query(
          `delete from usuario where id = ${id}`,
          function (err, res) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }
  );
});

router.post("/user/create", function (req, res, next) {
  const {id,nombre,telefono,correo,} = req.body;
  const message = "Usuario creado ";
  conection.query(
    "INSERT INTO usuario set ?",
    { id, nombre, telefono, correo },
    function (err, rows) {
      if (err) {
        console.log(err);
        redirect("/");
      }
      res.redirect(`/user/${id}`);
    }
  );
});

router.post("/update/", function (req, res) {
  let {id,nombre,telefono,correo} = req.body;
  conection.query(
    `update usuario set ? where id = ${id}`,
    { nombre, telefono, correo },
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/user/${id}`);
    }
  );
});

router.post("/add/tarea/", function (req, res) {
  conection.query("INSERT INTO tarea set ? ", req.body, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

router.post("/tarea/update/:id/:id_user", function (req, res) {
  let {id, id_user} = req.params;
  conection.query(
    `update tarea set ? WHERE id_tarea = ${id}`,
    req.body,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.redirect(`/user/${id_user}`);
        console.log('updated');
      }
    }
  );
});

router.get('/tarea/delete/:id/:user_id', function (req, res) {
  let {id,user_id} = req.params;
  conection.query(`DELETE FROM tarea WHERE id_tarea = ${id}`, function (err, res) {
    if (err) {
      console.log(err);
    }else {
      console.log('delete completed successfully');
    }
  })
  res.redirect(`/user/${user_id}`); 
});

export default router;
