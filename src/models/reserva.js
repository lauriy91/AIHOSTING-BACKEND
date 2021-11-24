//Importamos mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservaSchema = new Schema({

    nombre: String,
    telefono: Number,
    email: String,
    fch_inicio: String,
    id_alojamiento:String

}, {

    collection: "reservas"
    
});

module.exports = mongoose.model('Reserva', reservaSchema);