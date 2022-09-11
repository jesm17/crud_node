import express from "express";
const router = express.Router();
import conection from "../../database/conection.js";

router.get("/categories", function (req, res) {
  let categorias;
  conection.query("SELECT * FROM categoria", function (err, rows) {
    if (err) {
      console.log(err);
    } else {
      categorias = rows;
    }
    res.render("categories/categories", { categorias: categorias });
  });
});

router.post("/categories/update/", function (req, res) {
  let { id, nombre_categoria, color } = req.body;
  conection.query(
    "UPDATE categoria SET ? WHERE id_categoria =? ",
    [{ nombre_categoria: nombre_categoria, color: color }, id],
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("updated successfully");
        res.redirect("/categories");
      }
    }
  );
});

router.post("/create/categorie", function (req, res) {
  conection.query(
    "INSERT INTO categoria set ?",
    req.body,
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/categories");
      }
    }
  );
});

router.get("/delete/categorie/:id_categoria", function (req, res) {
  let { id_categoria } = req.params;
  conection.query(
    `delete from tarea where tarea.id_categoria_t=${id_categoria}`,
    function (err, rows) {
      if (err) {
        console.log(err);
      } else {
        conection.query(
          `delete from categoria where categoria.id_categoria=${id_categoria}`,
          function (err, rows) {
            if (err) {
              console.log(err);
            } else {
              res.redirect("/categories");
            }
          }
        );
      }
    }
  );
});

export default router;
