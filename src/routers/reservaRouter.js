//Importamos express
const express = require('express');
//Importamos reservaController
const ReservaController = require('../controllers/reservaController');

class RouterReserva{

    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
        
        const objReservaC = new ReservaController();
        
        this.router.post("/reservas", objReservaC.crear);
        this.router.get("/reservas", objReservaC.consultar);
        this.router.get("/reservas/:id", objReservaC.consultaReservasPorID);
        this.router.put("/reservas", objReservaC.actualizar);
        this.router.delete("/reservas", objReservaC.eliminar);
    }

}

//Exportamos RouterReserva
module.exports = RouterReserva;