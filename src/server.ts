import express from 'express'
import router from './router';
import db from './config/db';
import colors from 'colors'


//Conecta a base de datos
async function connectDB(){
    try{ 
        await db.authenticate();
        db.sync();
        console.log(colors.blue( 'Conexión exitosa a la base de datos' ));
    }catch( error ){ 
        //console.log(  "🚀 ~ connectDB ~ error:", error)
        console.log( colors.red.bold(  'Hubo un error al conectar a la base de datos' ) );
    }
}
//Instanciar express
const server = express();

//Leer datos de formularios
server.use( express.json( )) 
server.use('/api/products' , router );
connectDB()

export default server
