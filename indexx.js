const express = require("express");
const rutasProductos = require("./rutas/rutasProductos");

const app = express();{
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    app.use("/",rutasProductos)
}


const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("Servidor en http://localhost:"+ port);
});