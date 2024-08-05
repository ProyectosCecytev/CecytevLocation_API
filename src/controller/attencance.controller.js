const { UUID } = require("sequelize");
const Attendance = require("../model/Asistencia.model")
const Students = require("../model/Estudiante.model")
const uuid = require('uuid');

const registerAttendance = async (req, res) => {
    //obtener los datos del body enviados desde el cliente
    const { typeAttendance, idStudent, idTeacher } = req.body;
    try {
        //verificar si el estudiante existe
        val = await Students.findOne({
            where: {
                matricula: idStudent
            }
        });
        //No existe el estudiante
        if (!val) {
            res.status(404).send({
                message: "Student not found"
            });
            return;
        }
        //Si existe el estudiante
        //creando y guardando objeto para guardar la asistencia
        Attendance.create({
            idAsistencia: uuid.v4(),
            fechaAsistencia: Date.now(),
            tipoAsistencia: typeAttendance,
            matricula: idStudent,
            emailDocente: idTeacher
        })
        //enviando respuesta al cliente(asistencia registada)
        res.status(200).send({
            nombreEstudiante: val.nombre,
            apeliddoEStudiantes: val.appaterno + " " + val.apmaterno,
            matricula: val.matricula,
        });
    } catch (error) {
        //error en la base de datos o en el servidor
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }
}

module.exports = { registerAttendance }
