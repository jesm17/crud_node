import express from "express";
const router = express.Router();
import conection from "../../database/conection.js";

router.get("/estados", function (req, res) {
  conection.query("select * from estado", function (err, rows) {
    if (err) {
      console.log(err);
    } else {
     let estados= rows
     res.render('stades/stades',{estados: estados});
    }
  });
});

router.post('/estados/update/:id',function (req, res) {
    let id= req.params.id

    let descripcion_estado=req.body.descripcion_estado
    conection.query(`UPDATE estado SET ? WHERE id_estado = ${id} `,[{descripcion_estado:descripcion_estado}],function (err) {
        if (err){
            console.log(err)
        }else{
            res.redirect('/estados')
        }
    })
})

export default router;
