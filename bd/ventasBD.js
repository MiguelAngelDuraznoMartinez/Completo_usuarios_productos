const ventasBD = require("./conexion").ventas; 
const Venta = require("../clases/VentaClase"); 

function validarDatos(venta) {
    let datosCorrectos = true;


    if (!Number.isInteger(venta.cantidad) || venta.cantidad <= 0) {
        datosCorrectos = false;
    }

    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
    if (!fechaRegex.test(venta.fecha)) {
        datosCorrectos = false;
    }

    
    const horaRegex = /^([01]\d|2[0-3]):([0-5]\d)$/; // HH:MM
    if (!horaRegex.test(venta.hora)) {
        datosCorrectos = false;
    }

    
    if (!venta.idProducto || !venta.idUsuario) {
        datosCorrectos = false;
    }

    
    const estadosValidos = ['vendido', 'cancelado'];
    if (!estadosValidos.includes(venta.status)) {
        datosCorrectos = false;
    }

    return datosCorrectos;
}

async function mostrarVentas(req, res) {
    const ventas = await ventasBD.get();
    let ventasValidas = [];
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        const venta2 = venta1.getVenta;
        if (validarDatos(venta2)) {
            ventasValidas.push(venta2);
        }
    });
    return ventasValidas;
}

async function buscarPorId(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    let ventaValida = { error: true };
    if (validarDatos(venta1.getVenta)) {
        ventaValida = venta1.getVenta;
    }
    return ventaValida;
}

async function nuevaVenta(data) {
    const venta1 = new Venta(data);
    let ventaValida = false;
    if (validarDatos(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }
    return ventaValida;
}

async function cancelarVenta(id) {
    const ventaDoc = await ventasBD.doc(id).get();
    if (!ventaDoc.exists) {
        return false; 
    }

    
    await ventasBD.doc(id).update({ status: 'cancelado' });
    return true; 
}

module.exports = {
    mostrarVentas,
    nuevaVenta,
    cancelarVenta,
    buscarPorId
};