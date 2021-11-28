//Importar express
const express = require('express');
//Importar mongoose
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const bodyparser = require ('body-parser');
// require('./urlDatabase')
//Importamos la conexión a la BD
const DatabaseConnection = require("./database/databaseConnection")
//Importamos las rutas
const RouterUsuario = require('./routers/usuarioRouter')
const RouterReserva = require('./routers/reservaRouter')
const RouterAlojamiento = require('./routers/alojamientoRouter')
const RouterAdmin = require('./routers/adminRouter')

//Levantamos el servidor
class Server{

    constructor(){
    
        //Construimos un objeto de conexion a la BD
        const dbConnection = new DatabaseConnection();
        //Variable que hace referencia al servidor, crea app express
        this.app = express();
        //Configuramos parametros de express para levantar el servidor
        this.config();
    }

    config(){

        //Indicar el puerto por el que se ejecutará el servidor
        this.app.set('port', process.env.PORT || 3000);
        //Indicar el uso del formato json para enviar informacion con JSON
        this.app.use(express.json());
        this.app.use(morgan('dev'));
        this.app.use(bodyparser.urlencoded({extended:true}));
        this.app.use(bodyparser.json());
        this.app.use(cors({origen: '*'}));

        //Configurar ruta raíz
        let router = express.Router();
        router.get('/', (req, res) => {
            console.log("¡Conexión exitosa!");
            res.status(200).json({message: "¡Conexión exitosa!"});
        });

        /*** CREAR RUTAS ***/

        //Creamos rutas. Después de importar serverRouters creamos el objeto server
        const alojamientoR = new RouterAlojamiento();
        const usuarioR = new RouterUsuario();
        const reservaR = new RouterReserva();
        const adminR = new RouterAdmin();
        
        //Añadir la rutas al servidor El servidor utiliza la ruta que se creó previamente
        this.app.use('/public', express.static(`${__dirname}/imagenes`))
        this.app.use(router);
        this.app.use(alojamientoR.router);
        this.app.use(reservaR.router);
        this.app.use(usuarioR.router);
        this.app.use(adminR.router);
        
        //Levantar el servidor y ponerlo a la escucha
        this.app.listen( this.app.get('port'), ()=>{
            console.log("Corriendo por el puerto =>", this.app.get('port'));
        });
    }

    conectarBD(){
        
        //mongoose.Promise = global.Promise;
        mongoose.connect(database.db).then(()=>{
            console.log("Conexión a BD con éxito");
        }).catch((err)=>{
            console.error("Error de conexión");
        });
    }
}

const obj = new Server();
