const findAllMascotasFetch = async () => {
    const respuesta = await fetch ('http://localhost:3001/mascotas');
    const datos = await respuesta.json();
    return datos;
}

const findAllMascotasAxios = async () => {
    const respuesta = await axios.get('http://localhost:3001/mascotas');
    return respuesta.data;
}

export { 
        findAllMascotasFetch,
        findAllMascotasAxios
        };