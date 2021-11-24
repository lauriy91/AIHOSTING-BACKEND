//Importamos el modelo usuario
const modeloUsuario = require('../models/usuario');

class UsuarioController {

    constructor() {
    }

    //Crear Usuario
    crear(req, res) {
        
        modeloUsuario.create(req.body, (error, data) =>{
            
            if(error) {                
                res.status(500).json(error);}
            else {
                res.status(201).json({data});

        }
    });
}

    //Consultar Usuarios
    consultar(req, res) {
        
        modeloUsuario.find((error, data)=>{
            if (error){                
                res.status(500).json(error);
            }
            else {
                res.status(200).json({data});
            }

        });
    }

    //Consultar Usuario por ID
    consultaUsuarioPorID(req, res) {
        let id = req.params.id;
        modeloUsuario.findById(id, (error, data)=>{

            if (error){
                res.status(500).json(error);
            }
            else {
                res.status(200).json({data});
            }

        });
    }
    
    //Actualizar Usuario
    actualizar(req, res){

        let {id, username, password } = req.body;

        let objUsuario = {
            username,
            password
        }

        modeloUsuario.findByIdAndUpdate(id, {
            
            $set: objUsuario},
            
            (error, data) => {

            if (error) {
            res.status(500).json(error);
            } else {
            res.status(200).json({data});
            }

        });
    }

    //Eliminar Usuario
    eliminar(req, res){

        let {id} = req.body;

        modeloUsuario.findByIdAndRemove(id, (error, data) => {

            if(error){
                res.status(500).json(error);
            }
            else{
                res.status(200).json({data});
            } 

        });
    }  
    

    //Autenticacion
    login(req, res) {

        let user = req.body.username;
        let password = req.body.password;

        modeloUsuario.findOne({ username: user }, (error, data) => {

            if (error) {
                res.status(500).json({ mensaje: "error" });
            } 
            else if (data==null) {
                res.status(200).json({ mensaje: "Usuario no registrado" });
            } 
            else{
                if (password === data.password) {
                    res.status(200).json({
                    mensaje: "exito",
                    data,
                });
                } 
                else {
                res.status(200).json({ mensaje: "Email / contraseña incorrectos" });
                }
                
            }
        });
    }    
}

//Exportamos UsuarioController
module.exports = UsuarioController;
