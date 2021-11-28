const modeloAdmin = require('../models/admin');
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

class AdminC {
    constructor(){

            //1ra Petición
            AdminC.crear=async (req,res)=>{
            const {nombre, correo, contrasena}= req.body
            const NuevoAdmin = new AdminC({
                nombre,
                correo,
                contrasena 
            })
            const correoAdmin = await AdminC.findOne({correo:correo})
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
                    nombre:NuevoAdmin.nombre,
                    token
                })
            }
        }

        //2da Petición
        AdminC.login = async(req,res)=>{
            const {correo,contrasena}= req.body
            const adminC = await AdminC.findOne({correo:correo})
            if(!AdminC){

                return res.json({
                    mensaje: 'Correo incorrecto' 
                })
            }
            const match = await bcrypt.compare(contrasena, Admin.contrasena)

            if(match){
                const token = jwt.sign({_id: AdminC._id},'secreta')
                res.json({
                    mensaje: 'Has iniciado seción',
                    id: AdminC.id,
                    nombre: AdminC.nombre,
                    token
                })
            }

            else{
                res.json({
                    mensaje: 'Contraseña incorrecta'
                })
            }
        }
    }
}



module.exports = AdminC