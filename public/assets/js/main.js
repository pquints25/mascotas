import { construirTabla } from "./controlDOM.js";
import { findAllMascotasAxios, findAllMascotasFetch } from "./solicitudes.js";

const datos = await findAllMascotasAxios();
construirTabla(datos);





/*import { findAllMascotasAxios, findAllMascotasFetch } from "./solicitudes.js";

findAllMascotasFetch().then((datos) => {
    console.log(datos);
    
});

findAllMascotasAxios().then((datos) => {
    console.log(datos);
    
}); */