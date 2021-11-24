//Importamos el modelo reserva
const modeloReserva = require('../models/reserva');
    
class ReservaController{

    constructor() {
    }

        //Crear Reserva
    crear(req, res) {

        //Enviamos los datos al cuerpo
        modeloReserva.create(req.body, (error, data) =>{

            if(error) {
                res.status(500).json(error);
            }
            else {
                res.status(201).json({data});
            }

    });
    }

        //Consultar Reservas
    consultar(req, res) {

        modeloReserva.find((error, data)=>{

            if (error){
                res.status(500).json(error);
            }
            else {
                res.status(200).json({data});
            }

        });
    }

    //Consultar Reserva por ID
    consultaReservasPorID(req, res) {

        let id = req.params.id;

        modeloReserva.findById(id, (error, data)=>{

            if (error){
                res.status(500).json(error);
            }
            else {
                res.status(200).json({data});
            }

        });
    }
    
    //Actualizar Reserva
    actualizar(req, res){

        let {id, nombre, telefono, email, fch_inicio, id_alojamiento} = req.body;

        let objReserva = {
            nombre,
            telefono,
            email,
            fch_inicio,
            id_alojamiento
        }

        modeloReserva.findByIdAndUpdate(id, {
            
            $set: objReserva},
        
            (error, data) => {

            if (error) {
            res.status(500).json(error);} 
            else {
            res.status(200).json({data});
            }

        });
    }

    //Eliminar Reserva
    eliminar(req, res){

        let {id} = req.body;

        
        modeloReserva.findByIdAndRemove(id, (error, data) => {

            if(error){
                res.status(500).json(error);
            }

            else{
                res.status(200).json({data});
            } 

        });

    }   
}

//Exportamos ReservaController
module.exports = ReservaController;