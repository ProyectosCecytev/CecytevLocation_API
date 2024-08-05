
const router = require('express').Router();
const { registerAttendance } = require("../controller/attencance.controller");
//importando funciones de express-validator para validar campos de la peticion
const { check } = require('express-validator');
const { validationResult } = require('express-validator');

//ruta para registrar la asistencia de un estudiante y el modulo
//se realiza la validacion de los campos de la peticion(sanitizacion) 
router.post("/registerattendance", [
    check('typeAttendance')
    .isBoolean().withMessage('typeAttendance invalido'),
    check('idStudent')
    .notEmpty().withMessage('idStudent es obligatorio')
    .trim()
    .matches(/^[0-1]+$/).withMessage('idStudent invalido'),
    check('idTeacher')
    .notEmpty().withMessage('idteacher es obligatorio')
    .trim()
    .matches(/^[a-zA-Z0-1.@]+$/).withMessage('idteacher invalido'),

],registerAttendance);

module.exports = router;