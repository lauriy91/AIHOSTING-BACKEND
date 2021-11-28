const express = require('express');
const adminC = require('../controllers/adminController')

class RouterAdmin{
    
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
    
        const objAdminC = new adminC();
    
        this.router.post("/admin", objAdminC.crear);
        this.router.get("/admin/:id", objAdminC.login.consultaPorId);
    }

}

module.exports = RouterAdmin;