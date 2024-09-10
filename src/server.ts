import express from 'express'
import router from './router';
import swaggerUi from 'swagger-ui-express'
import db from './config/db';
import colors from 'colors'
import cors , { CorsOptions }  from 'cors'
import morgan from 'morgan'
import swaggerSpec from './config/swagger';


//Conecta a base de datos
export async function connectDB(){
    try{ 
        await db.authenticate();
        db.sync();
        //console.log(colors.blue( 'Conexión exitosa a la base de datos' ));
    }catch( error ){ 
        //console.log(  "🚀 ~ connectDB ~ error:", error)
        console.log( colors.red.bold(  'Hubo un error al conectar a la base de datos' ) );
    }
}
connectDB()
//Instanciar express
const server = express();

//Permitir conexiones a origenes cruzados
const corsOptions: CorsOptions = { 
    origin: ( origin , callback) => { 
        if( origin === process.env.FRONTEND_URL ){
            callback( null , true )
        }else { callback( new Error('Error de CORS')) }
    }
}

server.use( cors( corsOptions ) );


//Leer datos de formularios
server.use( express.json( )) 
server.use( morgan('dev') )
server.use('/api/products' , router );

server.use('/docs' , swaggerUi.serve  , swaggerUi.setup( swaggerSpec ))

export default server
