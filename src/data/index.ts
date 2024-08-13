import { exit } from 'node:process'
import db from '../config/db'
const clearDB = async() => {
     try {
        await db.sync({ force: true })
        console.log("Datos eliminados correctamente");
        exit();
     } catch (error) {
        console.log("🚀 ~ clearDB ~ error:", error)
        exit(1);
     }
}

//Revisar package en script "prestest" para mayor entendimiento
//Pretest siempre se ejecuta antes que el comando test
if(process.argv[2] === '--clear'){
    clearDB();
}