import express from "express";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const router = express.Router();

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

import indexRoutes from "./routes/routes.js";
import categoriesRoutes from "./routes/categories/categories.js";
import StadesRoutes from "./routes/stades/stades.js";
import { log } from "console";

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(indexRoutes);
app.use(categoriesRoutes);
app.use(StadesRoutes);

console.log(join(__dirname, "public"));
app.use(express.static(join(__dirname, "public")));

app.use((req, res)=> { 
  res.status(200).sendFile(__dirname+ "/public/images/404.svg"); 
  
});

app.listen(port, function () {
  console.log("Server running at http://localhost:" + port); 
});
