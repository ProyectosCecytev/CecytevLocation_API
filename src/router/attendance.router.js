
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

],
    (req, res, next) => {
        //validar token de autorizacion
        const header = req.header("Authorization") || "";
        const token = header.split(" ")[1];
        if (!token) {
            return res.status(403).send({ message: "Acceso denegado" }); //no hay token
        }
        //validar cargo del usuario en el token
        const decodeToken = jwt.verify(token, key); //decodificar token
        if (decodeToken.type != "Docente") {
            return res.status(403).send({ message: "Acceso denegado" });//no es padre
        }
        //validar campos de la peticion
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //error en los campos
        }
        next(); //continua al controlador
    }
    , registerAttendance);

module.exports = router;