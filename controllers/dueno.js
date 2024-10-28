const findAllDueno = require("../service/dueno");

const findAllDuenoController = async (req, res) => {
    const respuesta = await findAllDueno();
    res.status(200).json(respuesta.datos)
}

module.exports = findAllDuenoController;