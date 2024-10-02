const express = require('express');
const router = express.Router();
const {mostrarVentas,nuevaVenta,buscarPorId,cancelarVenta} = require('../bd/ventasBD'); 

router.get('/', async (req, res) => {
    try {
        const ventas = await mostrarVentas();
        res.status(200).json(ventas);
    } catch (error) {
        console.error("Error al mostrar ventas:", error);
        res.status(500).json({ mensaje: "Error al obtener ventas." });
    }
});

router.post('/', async (req, res) => {
    const data = req.body; 
    try {
        const ventaCreada = await nuevaVenta(data);
        if (ventaCreada) {
            res.status(201).json({ mensaje: "Venta creada exitosamente." });
        } else {
            res.status(400).json({ mensaje: "Datos de venta inválidos." });
        }
    } catch (error) {
        console.error("Error al crear venta:", error);
        res.status(500).json({ mensaje: "Error al crear venta." });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const venta = await buscarPorId(id);
        if (venta.error) {
            res.status(404).json({ mensaje: "Venta no encontrada." });
        } else {
            res.status(200).json(venta);
        }
    } catch (error) {
        console.error("Error al buscar venta:", error);
        res.status(500).json({ mensaje: "Error al buscar venta." });
    }
});

router.put('/:id/cancelar', async (req, res) => { 
    const id = req.params.id;
    try {
        const cancelada = await cancelarVenta(id); 
        if (cancelada) {
            res.status(200).json({ mensaje: "Venta cancelada exitosamente." });
        } else {
            res.status(404).json({ mensaje: "Venta no encontrada." });
        }
    } catch (error) {
        console.error("Error al cancelar venta:", error);
        res.status(500).json({ mensaje: "Error al cancelar venta." });
    }
});

module.exports = router;


