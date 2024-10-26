const { response } = require("express");
const { findAllMascotas, findByIdMascotas, createMascota, updateMascota } = require("../service/mascotas");

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
    const id = Number(req.params.id); 
    console.log('ID RECIBIDO:', id);
    
    const { nombre, especie, raza, edad, genero } = req.body;
    console.log('Datos recibidos:', { nombre, especie, raza, edad, genero });
    
    const respuesta = await updateMascota(id, nombre, especie, raza, edad, genero);
    
    res.status(respuesta.status).json(respuesta)
}

module.exports = {  findAllMascotasController,
                    findByIdMascotasController,
                    createMascotaController,
                    updateMascotaController };