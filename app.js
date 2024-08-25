//Tool to conect app with DB
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const dotenv = require('dotenv')
const apiVersion = process.env.API_VERSION

const app = express();

// Config header HTTP - CORS
app.use(cors());

// import Routes
const authRouter = require('./router/auth')

// Body Parser (parse json file)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Static Folder
app.use(express.static('uploads'));


//Config Routes
app.use(`/api/${apiVersion}`, authRouter);

module.exports = app
