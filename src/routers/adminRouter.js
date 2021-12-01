const express = require('express');
const AdminController = require('../controllers/adminController')

class RouterAdmin{
    
    constructor(){
        this.router = express.Router();
        this.config();
    }

    config(){
    
        const objAdminC = new AdminController();
        this.router.post("/admin", objAdminC.crear);
        this.router.post("/admin/login", objAdminC.login);
    }

}

module.exports = RouterAdmin;
