revisar bien base de datos

service updateMascota

const updateMascota = async (id, nombre, especie, raza, edad, genero) => {
    try {
        const mascota = await Mascotas.findByPk(id);
        if (!mascota) {
            return {
                msg: 'Mascota no encontrada',
                status: 404,
                datos: []
            };
        }

        // Validación básica de los datos (opcional)
        if (!nombre || !especie || !raza || typeof edad !== 'number' || !genero) {
            return {
                msg: 'Datos incompletos o incorrectos',
                status: 400,
                datos: []
            };
        }

        // Actualización de los campos
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
        console.error('Error actualizando la mascota:', error.message);
        return {
            msg: 'Error actualizando la mascota',
            status: 500,
            datos: []
        };
    }
};