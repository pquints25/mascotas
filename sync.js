/* const sequelize = require('./connection/connection');
const Mascotas = require('./models/mascotas');

const syncDatabase = async () => {
    try {
        // Sincroniza la base de datos, creando las tablas si no existen
        await sequelize.sync({ force: false }); // Cambia a { force: true } si quieres eliminar y recrear tablas
        console.log("Base de datos sincronizada correctamente.");
    } catch (error) {
        console.error("Error al sincronizar la base de datos:", error);
    } finally {
        await sequelize.close();
    }
};

syncDatabase(); */ //lueego node sync.js