//Importamos mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const data = require('../serverConfig')


const alojamientoSchema = new Schema({

    nombre:String,
    ubicacion:String,
    habitacion:String,
    presupuesto: Number,
    fch_ingreso:String,
    tmp_estadia:String,
    descripcion:String,
    servicios: Array,
    coordenadas: String,
    imagen:String

}, {

    collection: "alojamientos"
});

alojamientoSchema.methods.setImagen = function setImagen(filename) {
    this.imagen = `${filename}`
}

module.exports = mongoose.model('Alojamientos', alojamientoSchema);