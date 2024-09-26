const express = require("express");
const rutasUsuarios = require("./rutas/rutasUsuarios");
const rutasProductos = require("./rutas/rutasProductos");


const app = express();


app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


app.use("/", rutasUsuarios);
app.use("/", rutasProductos);

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log("Servidor en http://localhost:" + port);
});