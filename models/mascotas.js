const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");
const Dueno = require('./duenos');

const Mascotas = sequelize.define('Mascotas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING,
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING,
        allowNull: false
    },
    raza: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_dueno: { 
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'mascotas',
    timestamps: false
});

Dueno.hasMany(Mascotas, {
    foreignKey: 'id_dueno'
});
Mascotas.belongsTo(Dueno, {
    foreignKey: 'id_dueno'
});


module.exports = Mascotas;