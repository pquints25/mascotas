//CONNECTION => CONNECTION.JS
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/mascotas')

module.exports = sequelize;

//CONNECT => MASCOTAS.JS
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

//MODELS => MASCOTAS.JS
const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");


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
    }
}, {
    tableName: 'mascotas',
    timestamps: false
});

module.exports = Mascotas;

//ROUTES => MASCOTAS.JS
const express = require('express');
const {findAllMascotasController, findByIdMascotasController, createMascotaController, updateMascotaController} = require("../controllers/mascotas");
const router  = express.Router();

router.get('/', findAllMascotasController);
router.get('/:id', findByIdMascotasController);
router.post('/', createMascotaController );
router.put('/:id', updateMascotaController);



module.exports = router;

//SERVER => SERVER.JS
const express = require('express');
const mascotas = require("../routes/mascotas");

class Server {
    constructor(){
        this.app = express();
        this.port = 3001;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
    
    }

    routes(){
        this.app.use('/mascotas', require('../routes/mascotas'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el ${this.port}`);
            
        })

    }
}

module.exports = Server;

//SERVICE => MASCOTAS.JS
const Mascotas = require("../models/mascotas");

const findAllMascotas = async () => {
try{
    const mascotas = await Mascotas.findAll();
    if(mascotas.length === 0){
        return {
            msg: 'No hay datos en la tabla❌',
            status: 204,
            datos: []
        }
    }
        return {
            msg: 'Las mascotas encontradas son 🐾:',
            status: 200,
            datos: mascotas.map(mascotas => mascotas.toJSON())
        }
        
    } catch(error){
        console.log(error.message);
        return{
            msg: 'Error en el servidor',
            status: 500, 
            datos: []
        }
    }
}

const findByIdMascotas = async (id) => {
try{
    const mascota = await Mascotas.findByPk(id);

    if(!mascota){
        return{
            msg: 'Mascota perdida😢',
            status: 404,
            datos: []
        };
    }

    return{
        msg: 'Encontramos tu mascota 🐱‍🏍',
        status: 200,
        datos: mascota.toJSON()
    };
} catch (error){
    console.log(error);
    return{
    msg: 'no hay mascota 😒',
    status: 204,
    datos: []
        }
    }
}



const createMascota =  async (nombre, especie, raza, edad, genero) => {
try{
    if(!nombre || !especie || !raza || edad == null || !genero){
        return {
            msg: 'Todos los datos son obligatorios',
            status: 400,
            datos:[]
        };
    }

const mascota = await Mascotas.create({
    nombre,
    especie,
    raza,
    edad,
    genero
});

return {
    msg: `La mascota ${nombre} de especie ${especie}, raza ${raza}, edad ${edad} años y ${genero} se ha creado con exito`,
    status: 201,
    datos: mascota.toJSON()
        }
    } catch (error){
    console.log(error);    
        return{
            msg: 'No se pudo crear la mascota',
            status: 500,
            datos: []
        };
    }
}


const updateMascota = async (id, nombre, especie, raza, edad, genero) => {
    console.log('id recibido:', id);
    console.log('datos recibido', { nombre,  especie, raza, edad, genero });
    
    
    try {
        const mascota = await Mascotas.findByPk(id);
        console.log('Mascota encontrada:', mascota);
        
        if (!mascota) {
            return {
                msg: 'Mascota no encontrada',
                status: 404,
                datos: []
            };
        }
        mascota.nombre = nombre;
        mascota.especie = especie;
        mascota.raza = raza;
        mascota.edad = edad;
        mascota.genero = genero;

        await mascota.save(); 

        return {
            msg: 'Mascota actualizada con éxito',
            status: 200,
            datos: mascota.toJSON()
        };
    } catch (error) {
        console.log('Error al actualizar la mascota', error);
        return {
            msg: 'Error como siempre',
            status: 500,
            datos: []
        };
    }
};

const deleteById = async (id) =>{
    try{
        const mascota = await deleteById(id);
        
        }

};

module.exports = { findAllMascotas, 
                findByIdMascotas,
                createMascota,
                updateMascota   };

//INDEX.JS

const Server = require("./server/server");

const server = new Server();

server.listen();
