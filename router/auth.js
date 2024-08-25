const express = require('express');
const AuthController = require('../controllers/auth');

const api = express.Router();

api.post('/auth/register', AuthController.register);
// http://localhost:3977/api/v1/auth/register

module.exports = api;