import express from "express";

const router = express.Router();

import conection from "../database/conection.js";

router.get("/", function (req, res) {
    conection.query(
        "SELECT * FROM usuario ORDER BY nombre ASC",
        function (err, rows) {
            if (err) {
                console.log(err);
                res.status(500).json({error: "Error"});
            }
            let usuarios = rows;
            // console.log(usuarios);
            res.render("index", {usuarios: usuarios});
        }
    );
});
router.get("/user/:id", function (req, res) {
    const id = req.params.id;
    let id_tarea1 = []
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
            //let fechas = [];
            /* for (let i = 0; i < usuario.length; i++) {
                       fechas.push(usuario[i].fecha_inicio);

                       fechas.push(usuario[i].fecha_fin);
                   }*/

            //console.log(fechas);
        }
    );
    conection.query(
        `SELECT tarea.*, categoria.color, categoria.nombre_categoria, estado.descripcion_estado FROM tarea INNER JOIN categoria ON tarea.id_categoria_t=categoria.id_categoria INNER JOIN estado ON tarea.id_estado_t=estado.id_estado WHERE tarea.id_usuario_t = ${id}`,
        function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                tareas = rows
                console.log(tareas)
            }
        }
    );
    conection.query(`SELECT * FROM estado `, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            estados = rows
            //console.log(estados);
            res.render("tareas", {usuario: usuario, tareas: tareas, estados: estados});
        }


    });
})

router.get("/user/delete/:id", function (req, res) {
    const id = req.params.id;
    conection.query(`delete from usuario where id = ${id}`, function (err) {
        if (err) {
            console.log(err);
        }

        console.log(" se elimino el usuario");
        res.redirect("/");
    });
});

router.post("/user/create", function (req, res, next) {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const telefono = req.body.telefono;
    const correo = req.body.correo;
    const message = "Usuario creado ";
    conection.query(
        "INSERT INTO usuario set ?",
        {id, nombre, telefono, correo},
        function (err, rows, fields) {
            if (err) {
                console.log(err);
                // NextFunction();
                redirect("/");
            }
            res.redirect("/");
        }
    );
});

router.post("/update/", function (req, res) {
    //console.log(req.body)
    let id = req.body.id;
    let nombre = req.body.nombre;
    let telefono = req.body.telefono;
    let correo = req.body.correo;

    conection.query(
        `update usuario set ? where id = ${id}`,
        {nombre, telefono, correo},
        (err, rows, fields) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/");
        }
    );
});
router.post('/add/tarea/',function (req, res) {
    let id= req.body.id
  res.send(id);
})

export default router;
