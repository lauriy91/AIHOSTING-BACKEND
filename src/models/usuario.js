//Importamos mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({

    username: String,
    password: String

}, {

    collection: "usuarios"
    
});

module.exports = mongoose.model('Usuario', usuarioSchema);