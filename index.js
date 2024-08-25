//import mongoose (Conect Db)
const mongoose = require('mongoose');

//to read variables (.env) in app
require('dotenv').config();

//import app
const msg = 'Imperius.Srl_DB_CONNECTED'
const app = require('./app')

const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASSWORD; 
const dbHost = process.env.DB_HOST; 
const ipServer = process.env.IP_SERVER;
const apiVersion = process.env.API_VERSION;
const port = 3977;

//create conectDb function
const conectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@${dbHost}/`);
        app.listen(port, () => {
            console.log(msg);
            console.log(`https://${ipServer}:${port}/api/${apiVersion}`);
        })
        
    } catch (error) {
        console.log(`Conection Error: ${error}`);
    }
}

conectDB()
