const Dueno = require("../models/dueno")
const Mascotas = require("../models/mascotas")

const findAllDueno = async () => {
try {
    const duenos = await Dueno.findAll({
        include: Mascotas
    });
    return {
        msg: 'Los duenos de las mascotas son',
        status: 200,
        datos: duenos.map(dueno => dueno.toJSON())
    }

} catch (error) {
    return {
        msg: 'Error en el servidor',
        status: 500,
        datos: []
    }
    
}}

module.exports = findAllDueno;