const modeloAdmin = require('../models/admin');
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
const admin = require('../models/admin');

class AdminController {
    constructor(){
    }

        async crear(req, res, next){
            
            let {nombre, correo, contrasena}= req.body
            let NuevoAdmin = new admin({
                nombre,
                correo,
                contrasena 
            })
            const correoAdmin = await admin.findOne({correo:correo})
            if(correoAdmin){
                res.json({
                    mensaje: 'El correo ya existe'
                })
            }
            else{
                NuevoAdmin.contrasena = await bcrypt.hash(contrasena,10)
                const token = jwt.sign({_id:NuevoAdmin._id},'Secreta')
                await NuevoAdmin.save()
                res.json({
                    mensaje:'Bienvenido',
                    id: NuevoAdmin._id,
                    correo: NuevoAdmin.correo,
                    nombre:NuevoAdmin.nombre,
                    contrasena: NuevoAdmin.contrasena,
                    token
                })
            }
        next()
    }

        //2da Petición
        login(req, res) {

            let {correo,contrasena}= req.body
            let AdminController = admin.findOne({correo:correo})
            
            modeloAdmin.findOne({ correo: correo }, (error, data) => {
            
            if(!admin){

                return res.json({
                    mensaje: 'Ops Algo falló' 
                })
            }
            const match = bcrypt.compare(contrasena, admin.contrasena)

            if(match){
                const token = jwt.sign({_id: AdminController._id},'secreta')
                res.json({
                    mensaje: 'Bienvenido ',
                    id: AdminController.id,
                    nombre: AdminController.nombre,
                    token
                })
            }

            else{
                res.json({
                    mensaje: 'Contraseña incorrecta'
                });
            }
            next()
        });
        }
            
}       



module.exports = AdminController
