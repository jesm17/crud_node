import express from "express";
import {join, dirname} from "path";
import {fileURLToPath} from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

const port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
import indexRoutes from "./routes/routes.js";
import categoriesRoutes from "./routes/categories/categories.js";

app.use(indexRoutes);
app.use(categoriesRoutes);  
console.log(join(__dirname, 'public'));
app.use(express.static(join(__dirname, "public")));
// app.use(express.static(join(__dirmane, "public")));

app.listen(port, function () {
    console.log("Server running at http://localhost:" + port);
});
