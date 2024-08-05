const router = require('express').Router();
const { login, getAllStudents, testConnection } = require("../controller/login.controller.js");
//importando funciones de express-validator para validar campos de la peticion
const { check, validationResult } = require('express-validator');
//ruta para el login
router.post("/login", [
    check('user')
        .notEmpty().withMessage('El nombre de usuario es obligatorio.')
        .trim()
        .matches(/^[a-zA-Z0-9.@]+$/).withMessage('user invalido'),
    check('passwordUser')
        .notEmpty().withMessage('La contraseña es obligatoria.')
        .trim()
        .isLength({ min: 1 }).withMessage('La contraseña debe tener al menos 1 caracteres.')

], (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next(); // Continua al controlador
},
    login);

//endpoints de prueba
//router.get("/students", getAllStudents);
//router.post("/testConnection", testConnection);

module.exports = router;

