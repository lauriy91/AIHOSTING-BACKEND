//Importamos el modelo alojamiento
const modeloAlojamiento = require('../models/alojamiento')

const fs = require('fs-extra')
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'dm3p6nlii',
    api_key: '921485912968493',
    api_secret: 'z_we9gxnZRu0Hqh_QCaiR4rG7cA'
})


class AlojamientoController {

    constructor() {

    }

    //Crear Alojamiento
    async crear(req, res, next) {
    
        //Enviamos los datos al body
        let {nombre,ubicacion,habitacion,presupuesto,fch_ingreso,tmp_estadia,descripcion, servicios, coordenadas} = req.body

        const obj = new modeloAlojamiento({
            nombre,ubicacion,habitacion,presupuesto,fch_ingreso,tmp_estadia,descripcion, servicios, coordenadas
        })

        const filename = req.file.path
        const result = await cloudinary.v2.uploader.upload(filename)
        await fs.unlink(filename)
        obj.setImagen(result.url)
        const r = await obj.save()
        
        if (r) {
            res.status(201).json({"message":"Creado exitosamente"})
        }
        next()

    }

    //Consultar Alojamientos
    consultar(req, res) {

        modeloAlojamiento.find((error, data)=>{
            
            if (error){
                res.status(500).send(error);
            } else {
                res.status(200).json({data});
            }

        });
    }

    //Consultar Alojamiento por ID
    consultaPorID(req, res) {

        let id = req.params.id;

        modeloAlojamiento.findById(id, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({data});
            }

        });
    }

    //Consultar Alojamiento por Nombre
    consultaPorNombre(req, res) {

        let nombre = req.params.nombre;

        modeloAlojamiento.find({ nombre: nombre }, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({ data });
            }

        });
    }

    //Filtro ubicacion
    consultaPorUbicacion(req, res) {

        let ubicacion = req.params.ubicacion;

        modeloAlojamiento.find({ ubicacion: ubicacion }, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({ data });
            }

        });
    }   

    //Filtro habitacion
    consultaPorHabitacion(req, res) {

        let habitacion = req.params.habitacion;

        modeloAlojamiento.find({ habitacion: habitacion }, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({ data });
            }
            
        });
    }    

    //Filtro presupuesto
    consultaPorPresupuesto(req, res) {

        let presupuesto = req.params.presupuesto; 

        modeloAlojamiento.find({ presupuesto: presupuesto }, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({ data });
            }

        });
    }

    //Filtro fecha ingreso
    consultaPorFIngreso(req, res) {

        let fch_ingreso = req.body.fch_ingreso;

        modeloAlojamiento.find({ fch_ingreso: fch_ingreso }, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({ data });
            }
            
        });
    }  

    //Filtro tiempo estadia
    consultaPorTEstadia(req, res) {

        let tmp_estadia = req.params.tmp_estadia;

        modeloAlojamiento.find({ tmp_estadia: tmp_estadia }, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json({ data });
            }

        });
    }  
    
    //Actualizar Alojamiento
    async actualizar(req, res, next) {

        // Obtener el id del Alojamiento a actualizar
        let id = req.params.id
        // Obtenemos la ruta del archivo que se subirá a cloudinary
        const filename = req.file.path
        // Metodo para subir la imagen nueva a cloudinary
        const result = await cloudinary.v2.uploader.upload(filename)
        // Metodo que borra el archivo local
        await fs.unlink(filename)
        // Variable que optiene la url de la imagen recien subida
        const imagen = result.url
        // Los nuevos datos de el alojamiento
        let {nombre,ubicacion,habitacion,presupuesto,fch_ingreso,tmp_estadia,descripcion,servicios,coordenadas} = req.body;
        // Se crea el objeto con todos los atributos necesarios para actualizar el alojamiento
        let objAlojamiento = {nombre,ubicacion,habitacion,presupuesto,fch_ingreso,tmp_estadia,descripcion,servicios,coordenadas}
        // Metodo que actualiza

        modeloAlojamiento.findByIdAndUpdate(id, {

            $set: objAlojamiento

        }, (error, data) => {

            if (error) {
                res.status(500).send(error);
            } else {
                res.status(200).json(objAlojamiento);
            }
            
        });
    }

    //Eliminar Alojamiento
    eliminar(req, res) {        
        let id = req.params.id;
        modeloAlojamiento.findByIdAndRemove(id, (error, data) => {
            if (error) {
                res.status(500).send();
            } else {
                res.status(200).json(data);
            }
        })
    }

}

//Exportamos AlojamientoController
module.exports = AlojamientoController;
