require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const serverHost = process.env.SERVER_HOST;

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize (dbName, dbUser, passwordConnection, { host: serverHost.toString(), dialect: 'postgres' });

class Usuario extends Model {}
Usuario.init({
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: false
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        idcargo: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "usuarios",
        timestamps: false
    }
);

module.exports = Usuario;