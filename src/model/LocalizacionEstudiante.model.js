require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const serverHost = process.env.SERVER_HOST;

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize (dbName, dbUser, passwordConnection, { host: serverHost.toString(), dialect: 'postgres' });

class LocalizacionEstudiante extends Model {}
LocalizacionEstudiante.init(
    {
        idLocalizacionEstudiante: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        fechaRegistro: {
            type: DataTypes.STRING,
            allowNull: false
        },
        matricula: {
            type: DataTypes.STRING,
            allowNull: false
        },
        latitud: {
            type: DataTypes.STRING,
            allowNull: false
        },
        longitud: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "localizacionEstudiante",
        tableName: "localizacionEstudiante",
        timestamps: false
    }
);

module.exports = LocalizacionEstudiante;