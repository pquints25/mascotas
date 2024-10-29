import { findAllMascotasFetch, findAllMascotasAxios,  } from "./solicitudes.js";

const construirTabla = async () => {
    const cuerpoTabla = document.querySelector('#cuerpoTabla');
    const idMascota = document.querySelector('#txtIdMascota').value;
    const datos = await findAllMascotasFetch();
    console.log(datos);
    
    cuerpoTabla.innerHTML = '';

    const mascotaMostradas = idMascota ? datos.filter(mascotas => mascotas.id === Number(idMascota)) : datos;
    mascotaMostradas.forEach(mascotas => {
            cuerpoTabla.innerHTML += `<tr>
                <td>${mascotas.nombre}</td>
                <td>${mascotas.raza}</td>
                <td>${mascotas.edad}</td>
                <td>${mascotas.especie}</td>
                <td>${mascotas.genero}</td>
                <td>${mascotas.rut.Dueno}</td>
                <td>${mascotas.nombre.Dueno}</td>
                <td>${mascotas.apellido.Dueno}</td>
            </tr>`
        })
    };

    const btnBuscar = document.querySelector('#btnBuscar');
    btnBuscar.addEventListener('click', construirTabla);    
    


export{
    construirTabla
}