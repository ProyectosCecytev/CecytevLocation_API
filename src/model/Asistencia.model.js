// configuracion para acceder a las variables de entorno    
require('dotenv').config();
//contrasena de la base de datos
const passwordConnection = process.env.SQL_PASS;
//nombre de la base de datos
const dbName = process.env.DB_NAME;
//usuario de la base de datos
const dbUser = process.env.DB_USER;
//host de la base de datos
const serverHost = process.env.SERVER_HOST;
//conigurando sequelize
const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize (dbName, dbUser, passwordConnection, { host: serverHost, dialect: 'postgres' });


//configurando modelo
class Asistencia extends Model { }

//definiendo modelo
//el nombre del modelo debe ser igual al de la tabla en la base de datos
//los nombres de los atributos deben ser iguales a los de la base de datos
//el tipo de dato debe ser el mismo que el de la base de datos
Asistencia.init(
    {
        idAsistencia: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        fechaAsistencia: {
            type: DataTypes.DATE,
            allowNull: false
        },
        tipoAsistencia: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false
        },
        emailDocente: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        //configuracion de la base de datos y modelo 
        sequelize,
        modelName: "Asistencia",
        timestamps: false
        //timestamps es para que no cree las columnas de createdAt y updatedAt en la base de datos
        //sequelize es la conexion a la base de datos
        //modelName es el nombre del modelo en la base de datos SIGE
    }
);


module.exports = Asistencia;    