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
    try {
        const mascota = await Mascotas.findByPk(id);
    
        if (!mascota) {
            return {
                msg: `No se encontró mascota con ID: ${id}`,
                status: 204,
                datos: []
            };
        }

        mascota.nombre = nombre || mascota.nombre;
        mascota.especie = especie || mascota.especie;
        mascota.raza = raza || mascota.raza;
        mascota.edad = edad || mascota.edad;
        mascota.genero = genero || mascota.genero;

        await mascota.save();

        return {
            msg: 'Mascota actualizada exitosamente',
            status: 200,
            datos: mascota
        };
    } catch (error) {
        console.log(error.message);
        return {
            msg: 'Error al actualizar la mascota',
            status: 500,
            datos: []
        };
    }
};

const deleteMascota = async (id) => {
try{
    const mascota = await Mascotas.findByPk(id);
    if(!mascota){
        return{
            msg: `No se encontro la mascota asociada al ${id}`,
            status: 204,
            datos: []
        };
    }
    await mascota.destroy();

    return{
        msg: 'Mascota eliminada exitosamente',
        status: 200,
        datos: []
    };
} catch (error){
    console.log('Error', error);
    return{
        msg: 'Error en el servidor',
        status: 500,
        datos: []
        };
    }
}

module.exports = { findAllMascotas, 
                findByIdMascotas,
                createMascota,
                updateMascota,
                deleteMascota 
                };