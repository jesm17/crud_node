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

export default router;
