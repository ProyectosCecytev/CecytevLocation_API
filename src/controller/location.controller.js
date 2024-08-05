const LocationStudent = require('../model/LocalizacionEstudiante.model');
const Student = require('../model/Estudiante.model');
const uuid = require('uuid');

const registerLocationStudent = async (req, res) => {
    const { matricula, latitud, longitud } = req.body;
    try {
        //recuperando informacion de estudiante
        studentFinded = await Student.findOne({
            where: {
                idStudent: idStudent
            }
        });
        //verificar que el estudiante este registrado en sistema
        if (studentFinded) {
            //verificar que estudiante no haya registrado su ubicacion
            locationStudentFinded = await LocationStudent.findOne({
                where: {
                    matricula: matricula
                }
            });
            //localizaicon encontrada
            if (locationStudentFinded) {
                //actualizando localizacion de estudiante
                await LocationStudent.update({
                    fechaRegistro: locationStudentFinded.fechaRegistro + ";" + Date.now(),
                    latitud: locationStudentFinded.latitud + ";" + latitud,
                    longitud: locationStudentFinded.longitud + ";" + longitud
                }, {
                    where: {
                        matricula: matricula
                    }
                });
                //enviando respuesta exitosa
                res.status(200).send({
                    message: "Localizacion de estudiante actualizada"
                });
            } else {
                //localizacion no encontrada
                LocationStudent.create({
                    idLocalizacionEstudiante: uuid.v4(),
                    fechaRegistro: Date.now(),
                    matricula: matricula,
                    latitud: latitud,
                    longitud: longitud
                });
                res.status(200).send({
                    message: "Localizacion de estudiante Creada"
                });
            }
        } else {
            //enviando respuesta si no se encuentra la matricula del estudiante en la lista de estudainte
            res.status(404).send
                ({
                    message: "La matricula de estudiante no se encuentra registada en el sistema"
                });
        }
    } catch (error) {
        //error en la base de datos o en el servidor
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }
}

const getLocationStudent = async (req, res) => {
    //recuperando matricula de estudiante del parametro de la URL
    const { matricula } = req.params;
    try {
        //recuperando indormacion de alumno
        const studentFinded = await Student.findOne({
            where: {
                matricula: matricula
            }
        });
        //verificar que el estudiante este registrado en sistema
        if (studentFinded) {
            //recuperando localizacion del estudiante
            const locationStudent = await LocationStudent.findOne({
                where: {
                    matricula: matricula
                }
            })
            //verificar que la localizacion del estudiante exista
            if (locationStudent) {
                //variables para realizar split de los datos
                const idLocalizacionEstudiante = locationStudent.idLocalizacionEstudiante;
                const dateSplit = locationStudent.fechaRegistro.split(";");
                const latitudSplit = locationStudent.latitud.split(";");
                const longitudSplit = locationStudent.longitud.split(";");
                //creando objeto de respuesta
                const locationStudentFiltered = [];
                //llenando objeto de respuesta
                for (let i = 0; i < dateSplit.length; i++) {
                    //agregando localizacion al objeto(lista) de respuesta
                    locationStudentFiltered.push({
                        idLocationStudent: idLocalizacionEstudiante,
                        dateLocation: dateSplit[i],
                        latitudeStudent: latitudSplit[i],
                        longitudeStudent: longitudSplit[i]
                    });
                }
                //enviando respuesta exitosa
                res.status(200).send({
                    name: studentFinded.nombre + " " + studentFinded.appaterno + " " + studentFinded.apmaterno,
                    matricula: studentFinded.matricula,
                    locations: locationStudentFiltered
                });

            } else {
                //enviando respuesta si no hay una localizacion del estudiante
                res.status(404).send({
                    message: "No se encontró alguna localización previa del estudiante"
                });
            }
        } else {
            //enviando respuesta si no se encuentra la matricula del estudiante en la lista de estudainte
            res.status(404).send({
                message: "La matricula ingresada no se encuentra registrada en el sistema"
            });
        }
    } catch (error) {
        //error en la base de datos o en el servidor    
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }
}

const getChildrenList = async (req, res) => {
    try {
        //recuperando telefono del padre del body de la peticion
        const { telephoneParent } = req.body;
        //recuperando lista de hijos que coincidan con el telefono del padre    
        var childrenList = await Student.findAll({
            where: {
                telefono: telephoneParent
            }
        });
        //verificar si se encontraron hijos registrados
        if (childrenList) {
            //creando lista de hijos para enviar a la app
            const childrenListFiltered = [];
            //llenando lista de hijos
            childrenList.forEach(child => {
                childrenListFiltered.push({
                    idStudent: child.matricula,
                    name: child.nombre + " " + child.appaterno + " " + child.apmaterno,
                });
            });
            //enviando lista de hijos al cliente
            res.status(200).send({
                childrenListFiltered
            });
        } else {
            //enviando respuesta si no se encontraron hijos registrados
            res.status(404).send({
                message: "No se encontraron hijos registrados"
            });
        }
    } catch (error) {
        //error en la base de datos o en el servidor
        console.log("ERROR: ", error);
        res.status(500).send({
            message: "Error" + error
        });
    }

}

module.exports = { registerLocationStudent, getLocationStudent, getChildrenList }

