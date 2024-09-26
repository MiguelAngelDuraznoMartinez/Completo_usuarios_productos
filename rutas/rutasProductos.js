var ruta = require("express").Router();//nombre que quiera a la variable
//var {Router} = require("express"); //aqui esta la estructuracion llamando a una funcion Router
var {mostrarProductos,nuevoProducto,borrarProducto,buscarPorId}=require("../bd/productosBD");

ruta.get("/",async(req,res)=>{
    //res.send("hola estas en la raiz");
    const producto=await mostrarProductos();
    //console.log(usuarios);
    res.json(producto);
});
ruta.get("/buscarPorId/:id",async(req,res)=>{
    var productosValidos=await buscarPorId(req.params.id);
    res.json(productosValidos);
});

ruta.delete("/borrarProducto/:id",async(req,res)=>{
    var borrado=await borrarProducto(req.params.id);
    res.json(borrado);
});

ruta.post("/nuevoProducto", async(req,res)=>{
    var productosValidos = await nuevoProducto(req.body);
    res.json(productosValidos);
})

module.exports=ruta;