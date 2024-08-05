const router = require('express').Router();
const { check ,validationResult} = require('express-validator');
const { registerLocationStudent, getLocationStudent, getChildrenList } = require("../controller/location.controller");
const jwt = require('jsonwebtoken');
const key = process.env.JWT_SECRET;

//rutas especificas para cada funcion del controlador\

//Ruta para registrar la localizacion de un estudiante
router.post('/location/registerLocation', [
    check('matricula')
        .notEmpty().withMessage('Campo matcula obligatoria')
        .trim()
        .matches(/^[0-9]+$/).withMessage('matricula invalida'),
    check('latitud')
        .notEmpty().withMessage('Campo latitud obligatoria')
        .trim()
        .matches(/^[0-9.]+$/).withMessage('latitud invalida'),
    check('longitud')
        .notEmpty().withMessage('Campo longitud obligatoria')
        .trim()
        .matches(/^[0-9.]+$/).withMessage('longitud invalida'),],

    (req, res, next) => {
        //validar token de autorizacion
        const header = req.header('Authorization' || "");
        const token = header.split(' ')[1];
        if (!token) {
            return res.status(403).send({ message: "Acceso denegado" }); //no hay token
        }
        //validar campos de la peticion
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); //error en los campos
        }
        next(); //continua al controlador
    },
    registerLocationStudent); //controlador

//Ruta para obtener la localizacion de un estudiante
router.get('/location/getLocationStudent/:matricula', [
    check('matricula')
        .notEmpty().withMessage('Campo matricula obligatoria') 
        .trim() 
        .matches(/^[0-9]+$/).withMessage('matricula invalida'), 
], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); //continua al controlador
},
    getLocationStudent); //controlador

//Ruta para obtener la lista de hijos de un padre
router.post('/location/getChildrenList', [
    check('telephoneParent')
        .notEmpty().withMessage('Campo telefono obligatoria')
        .trim()
        .matches(/^[0-9]+$/).withMessage('telefono invalido')
        .isLength({ min: 10, max: 10 }).withMessage('telefono debe tener 10 digitos'),
    ], (req, res, next) => {
    //validar token de autorizacion
    const header = req.header("Authorization") || ""; 
    const token = header.split(" ")[1]; 
    if (!token ) {
        return res.status(403).send({ message: "Acceso denegado" }); //no hay token
    }
    //validar cargo del usuario en el token
    const decodeToken = jwt.verify(token, key); //decodificar token
    if (decodeToken.type != "Padre") {
        return res.status(403).send({ message: "Acceso denegado" });//no es padre
    }

    //validar campos de la peticion
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });//error en los campos
    }
    next(); //continua al controlador
}
    , getChildrenList); //controlador

module.exports = router;