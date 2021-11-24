//Importamos express
const express = require('express');
//Importamos reservaController
const UsuarioController = require('../controllers/usuarioController');

class RouterUsuario{

    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
        
        const objUsuarioC = new UsuarioController();

        this.router.post("/usuarios", objUsuarioC.crear);
        this.router.get("/usuarios", objUsuarioC.consultar);
        this.router.get("/usuarios/:id", objUsuarioC.consultaUsuarioPorID);
        this.router.put("/usuarios/:id", objUsuarioC.actualizar);
        this.router.delete("/usuarios/:id", objUsuarioC.eliminar);
        this.router.get("/usuarios/login", objUsuarioC.login);
    }

}

//Exportamos RouterUsuario
module.exports = RouterUsuario;
