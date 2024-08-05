require('dotenv').config();
const passwordConnection = process.env.SQL_PASS;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const serverHost = process.env.SERVER_HOST;

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize (dbName, dbUser, passwordConnection, { host: serverHost.toString(), dialect: 'postgres' });

class Cargo extends Model {}

Cargo.init(
    {
        idcargo: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: false
        },
        cargo: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "cargo",
        tableName: "cargo",
        timestamps: false
    }
);

module.exports = Cargo;