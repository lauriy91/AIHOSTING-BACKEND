const express = require('express');
const AdminController = require('../controllers/adminController')

class RouterAdmin{
    
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
    
        const objAdminC = new AdminController();
        console.log("creado")
        this.router.post("/admin", objAdminC.crear);
        this.router.get("/admin/login", objAdminC.login);
    }

}

module.exports = RouterAdmin;
