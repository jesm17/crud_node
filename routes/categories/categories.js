import express from "express";
const router = express.Router();
import conection from "../../database/conection.js";

router.get('/categories', function(req, res){
    let categorias
    conection.query('SELECT * FROM categoria',function(err,rows){
        if (err) {
            console.log(err);
        } else {
            categorias = rows;
            //console.log(categorias);
        }
        //console.log(categorias);
        res.render('categories/categories',{categorias:categorias});
    });
})

export default  router;