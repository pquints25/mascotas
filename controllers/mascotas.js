const { response } = require("express");
const { findAllMascotas, findByIdMascotas, createMascota, updateMascota, deleteMascota } = require("../service/mascotas");

const findAllMascotasController = async (req, res) => {
    const respuesta = await findAllMascotas();
    res.status(200).json(respuesta.datos)
}

const findByIdMascotasController = async (req, res) => {
    const { id } = req.params;
    const respuesta = await findByIdMascotas(id);
    res.status(respuesta.status).json(respuesta.datos)
}

async function createMascotaController(req, res){
    const { nombre, especie, raza, edad, genero } = req.body;
    const respuesta = await createMascota(nombre,especie,raza,edad,genero);
    return res.status(respuesta.status).json({
        msg: respuesta.msg,
        datos: respuesta.datos
    });
}

const updateMascotaController = async (req, res) => {
    console.log('REQUEST PARAMS:', req.params);
    console.log('REQUEST BODY:', req.body);
    const id = Number(req.params.id);
    console.log('ID CONVERTIDO:', id, 'TIPO:', typeof id);
    
    const { nombre, especie, raza, edad, genero } = req.body;
    const respuesta = await updateMascota(id, nombre, especie, raza, edad, genero);
    return res.status(respuesta.status).json(respuesta);
};

const deleteMascotaController = async (req, res) => {
    const {id} = req.params;
    const respuesta = await deleteMascota(id);
    res.status(respuesta.status).json({
        msg: respuesta.msg,
        datos:respuesta.datos
    });
};
module.exports = {  findAllMascotasController,
                    findByIdMascotasController,
                    createMascotaController,
                    updateMascotaController,
                    deleteMascotaController
                };