const express = require ("express");
const app = express();
const routerLogin = require("../router/login.route");
const routerAttendance = require("../router/attendance.router");
const routerLocation = require("../router/location.router");

//ruta base para la api
const path  = '/api/v1'
//middleware para que el servidor pueda recibir y enviar respuestas en Json
app.use(express.json());

//Entutamiendo de la api
//ruta base + ruta especifica de cada recurso
app.use(path,routerLogin);
app.use(path,routerAttendance);
app.use(path,routerLocation);


module.exports = app;
