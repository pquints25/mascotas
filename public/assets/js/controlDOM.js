import { findAllMascotasFetch, findAllMascotasAxios,  } from "./solicitudes.js";

const btnInicio = document.querySelector('#btnInicio');
const btnInsertar = document.querySelector('#btnInsertar');

const construirTabla = async (datos) => {
    const main = document.querySelector('main');
    main.innerHTML = `<div class="container mt-5">
        <form>
        <div class="mb-3">
        <label for="txtIdMascota" class="form-label">Ingresa tu Mascota</label>
        <input type="number" class="form-control" id="txtIdMascota" name="txtIdMascota"><!-- indica nombre parametros -->
        </div>
        <button type="button" class="btn btn-danger" id="btnBuscar">Buscalo</button>
</div>
    <div class="container mt-5">
    <table class="table">
        <thead>
        <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Raza</th>
            <th scope="col">Edad</th>
            <th scope="col">Especie</th>
            <th scope="col">Genero</th>
            <th scope="col">Rut Dueño </th>
            <th scope="col">Nombre Dueño</th>
            <th scope="col">Apellido Dueño</th>
        </tr>
        </thead>
        <tbody id="cuerpoTabla">
        
        </tbody>
    </table>
</div>`
    const cuerpoTabla = document.querySelector('#cuerpoTabla');
    cuerpoTabla.innerHTML = '';
    datos.forEach(mascota => {
        cuerpoTabla.innerHTML += `<tr>
                <td>${mascota.nombre}</td>
                <td>${mascota.raza}</td>
                <td>${mascota.edad}</td>
                <td>${mascota.especie}</td>
                <td>${mascota.genero}</td>
                <td>${mascota.Dueno.rut}</td>
                <td>${mascota.Dueno.nombre}</td>
                <td>${mascota.Dueno.apellido}</td>
            </tr>`
        });

    const btnBuscar = document.querySelector('#btnBuscar');
    btnBuscar.addEventListener('click', async () => {
        const id = document.querySelector('#txtIdMascota').value;
        const datos = await findAllMascotasAxios(id);
        construirTabla(datos);
    });    
    } 

    export{
        construirTabla
    }
