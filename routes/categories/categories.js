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
            //console.log(categorias);
        }
        //console.log(categorias);
        res.render("categories/categories", {categorias: categorias});
    });
});

router.post("/categories/update/", function (req, res) {
    let id = req.body.id;
    let nombre_categoria = req.body.nombre_categoria;
    let color = req.body.color;

    conection.query(
        "UPDATE categoria SET ? WHERE id_categoria =? ",
        [{nombre_categoria: nombre_categoria, color: color}, id],
        function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log("updated successfully");
                res.redirect('/categories');
            }
        }
    );

});
router.post('/create/categorie', function (req, res) {
    console.log(req.body);
    conection.query('INSERT INTO categoria set ?', req.body, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/categories')
            //console.log('se creo');
        }
    });
});

router.get('/delete/categorie/:id_categoria', function (req, res) {
    let id_categoria = req.params.id_categoria
    conection.query(`delete from tarea where tarea.id_categoria_t=${id_categoria}`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            conection.query(`delete from categoria where categoria.id_categoria=${id_categoria}`, function (err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    res.redirect('/categories')

                }
            })
        }
    })
    //console.log(id_categoria)
})

export default router;
