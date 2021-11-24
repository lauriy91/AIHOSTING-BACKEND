//Importamos express
const express = require('express');
//Importamos alojamientorController
const AlojamientoController = require('../controllers/alojamientoController')
const upload = require('../libs/storage')


class RouterAlojamiento{
    
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
    
        const objAlojamientoC = new AlojamientoController();
    
        this.router.get("/alojamientos", objAlojamientoC.consultar);
        this.router.get("/alojamientos/:id", objAlojamientoC.consultaPorID);
        this.router.post("/alojamientos",upload.single('imagen'),objAlojamientoC.crear);
        this.router.put("/alojamientos/:id",upload.single('imagen'),objAlojamientoC.actualizar);
        this.router.delete("/alojamientos/:id", objAlojamientoC.eliminar);
        this.router.get("/alojamientos/nombre/:nombre", objAlojamientoC.consultaPorNombre);
        this.router.get("/alojamientos/habitacion/:habitacion", objAlojamientoC.consultaPorHabitacion);
        this.router.get("/alojamientos/ubicacion/:ubicacion", objAlojamientoC.consultaPorUbicacion);
        this.router.get("/alojamientos/presupuesto/:presupuesto", objAlojamientoC.consultaPorPresupuesto);
        this.router.get("/alojamientos/tmp_estadia/:tmp_estadia", objAlojamientoC.consultaPorTEstadia);
        this.router.get("/alojamientos/fch_ingreso", objAlojamientoC.consultaPorFIngreso);
        
    }

}

//Exportamos RouterAlojamiento
module.exports = RouterAlojamiento;