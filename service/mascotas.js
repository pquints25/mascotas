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
        // Log para verificar el ID que llega
        console.log('Buscando mascota con ID:', id, 'Tipo:', typeof id);
        
        // Primero hacemos un findByPk y mostramos el resultado
        const mascota = await Mascotas.findByPk(id);
        console.log('Resultado de búsqueda:', mascota);

        if (!mascota) {
            console.log('No se encontró mascota con ID:', id);
            return {
                msg: `No se encontró mascota con ID: ${id}`,
                status: 404,
                datos: null
            };
        }

        // Si encontramos la mascota, mostramos sus datos actuales
        console.log('Datos actuales de la mascota:', mascota.toJSON());

        // Intentamos actualizar
        await mascota.update({
            nombre: nombre || mascota.nombre,
            especie: especie || mascota.especie,
            raza: raza || mascota.raza,
            edad: edad || mascota.edad,
            genero: genero || mascota.genero
        });

        // Verificamos que se guardó correctamente
        const mascotaActualizada = await Mascotas.findByPk(id);
        console.log('Datos después de actualizar:', mascotaActualizada.toJSON());

        return {
            msg: 'Mascota actualizada exitosamente',
            status: 200,
            datos: mascotaActualizada.toJSON()
        };
    } catch (error) {
        console.error('Error detallado:', error);
        return {
            msg: 'Error al actualizar la mascota',
            status: 500,
            datos: null,
            error: error.message
        };
    }
};



module.exports = { findAllMascotas, 
                findByIdMascotas,
                createMascota,
                updateMascota   };