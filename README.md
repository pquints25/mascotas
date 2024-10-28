//CONNECTION
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:1234@localhost:5432/mascotas')

module.exports = sequelize;
-------------------------------------------------------------------------------------------------------------------------
/INDEX.JS
const Server = require("./server/server");

const server = new Server();

server.listen();
------------------------------------------------------------------------------------------------------------------------
//MODELS
DUENOS.JS
const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");

const Dueno = sequelize.define('Dueno', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    rut: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

module.exports = Dueno;
-----------------------------------------------------------------------------------------------------------------------
MASCOTAS.JS
const { DataTypes } = require("sequelize");
const sequelize = require("../connection/connection");
const Dueno = require('./duenos');

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
    },
    id_dueno: { 
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'mascotas',
    timestamps: false
});

Dueno.hasMany(Mascotas, {
    foreignKey: 'id_dueno'
});
Mascotas.belongsTo(Dueno, {
    foreignKey: 'id_dueno'
});


module.exports = Mascotas;
------------------------------------------------------------------------------------------------------------------------
//SERVER
const express = require('express');
const mascotas = require("../routes/mascotas");
const dueno = require("../routes/dueno")

class Server {
    constructor(){
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.routes();
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
    
    }

    routes(){
        this.app.use('/mascotas', require('../routes/mascotas'));
        this.app.use('/duenos', require("../routes/dueno"));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el ${this.port}`);
            
        })

    }
}

module.exports = Server;
----------------------------------------------------------------------------------------------------------------------
//CONTROLLERS
DUENO.JS
const findAllDueno = require("../service/dueno");

const findAllDuenoController = async (req, res) => {
    const respuesta = await findAllDueno();
    res.status(200).json(respuesta.datos)
}

module.exports = findAllDuenoController;
-----------------------------------------------------------------------------------------------------------------------
MASCOTAS.JS
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
    const { nombre, especie, raza, edad, genero, id_dueno } = req.body;
    const respuesta = await createMascota(nombre,especie,raza,edad,genero,id_dueno);
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
-----------------------------------------------------------------------------------------------------------------------
//ROUTES

DUENO.JS
const { Router } = require('express');
const findAllDuenoController = require('../controllers/dueno');

const router = Router();

router.get('/', findAllDuenoController);

module.exports = router;
-----------------------------------------------------------------------------------------------------------------------
MASCOTAS.JS
const express = require('express');
const {findAllMascotasController, findByIdMascotasController, createMascotaController, updateMascotaController, deleteMascotaController} = require("../controllers/mascotas");
const { deleteMascota } = require('../service/mascotas');
const router  = express.Router();

router.get('/', findAllMascotasController);
router.get('/:id', findByIdMascotasController);
router.post('/', createMascotaController );
router.put('/:id', updateMascotaController);
router.delete('/:id', deleteMascotaController);


module.exports = router;
-------------------------------------------------------------------------------------------------------------------------
//PUBLIC
INDEX.HTML

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <title>DueñosYMascotas</title>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Mansa Mascota</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <a class="nav-link" href="#">Servicios</a>
            <a class="nav-link" href="#">Quienes Somos</a>
            </div>
        </div>
        </div>
    </nav>
</head>
<body>
    <div class="container mt-5">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h2>Crear Mascota</h2>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">
                    <i class="bi bi-plus"></i> Nuevo Registro
                </button>
            </div>
        </div>
    </div>

    
    <!-- Tabla de registros -->
    <div class="table-responsive">
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody id="tableBody">
                <!-- Los registros se cargarán dinámicamente aquí -->
            </tbody>
        </table>
    </div>

    <!-- Modal para Crear -->
    <div class="modal fade" id="createModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Crear Nuevo Registro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="createForm">
                        <div class="mb-3">
                            <label for="createName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="createName" required>
                        </div>
                        <div class="mb-3">
                            <label for="createEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="createEmail" required>
                        </div>
                        <div class="mb-3">
                            <label for="createStatus" class="form-label">Estado</label>
                            <select class="form-select" id="createStatus" required>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="createRecord()">Guardar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para Editar -->
    <div class="modal fade" id="editModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Editar Registro</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <form id="editForm">
                        <input type="hidden" id="editId">
                        <div class="mb-3">
                            <label for="editName" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="editName" required>
                        </div>
                        <div class="mb-3">
                            <label for="editEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="editEmail" required>
                        </div>
                        <div class="mb-3">
                            <label for="editStatus" class="form-label">Estado</label>
                            <select class="form-select" id="editStatus" required>
                                <option value="activo">Activo</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onclick="updateRecord()">Actualizar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de Confirmación para Eliminar -->
    <div class="modal fade" id="deleteModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirmar Eliminación</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <p>¿Está seguro de que desea eliminar este registro?</p>
                    <input type="hidden" id="deleteId">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-danger" onclick="deleteRecord()">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.2/js/bootstrap.bundle.min.js"></script>
<script>
// Configuración de la URL base de la API
const API_URL = 'http://localhost:3000/api';

// Función para cargar los registros
async function loadRecords() {
    try {
        const response = await fetch(`${API_URL}/records`);
        const data = await response.json();
        const tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        
        data.forEach(record => {
            tableBody.innerHTML += `
                <tr>
                    <td>${record.id}</td>
                    <td>${record.nombre}</td>
                    <td>${record.email}</td>
                    <td>${record.estado}</td>
                    <td>
                        <button class="btn btn-sm btn-warning" onclick="prepareEdit(${JSON.stringify(record)})">
                            Editar
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="prepareDelete(${record.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error('Error al cargar registros:', error);
        alert('Error al cargar los registros');
    }
}

// Función para crear un nuevo registro
async function createRecord() {
    const nombre = document.getElementById('createName').value;
    const email = document.getElementById('createEmail').value;
    const estado = document.getElementById('createStatus').value;

    try {
        const response = await fetch(`${API_URL}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, estado })
        });

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('createModal')).hide();
            document.getElementById('createForm').reset();
            loadRecords();
            alert('Registro creado exitosamente');
        } else {
            alert('Error al crear el registro');
        }
    } catch (error) {
        console.error('Error al crear registro:', error);
        alert('Error al crear el registro');
    }
}

// Función para preparar la edición
function prepareEdit(record) {
    document.getElementById('editId').value = record.id;
    document.getElementById('editName').value = record.nombre;
    document.getElementById('editEmail').value = record.email;
    document.getElementById('editStatus').value = record.estado;
    
    new bootstrap.Modal(document.getElementById('editModal')).show();
}

// Función para actualizar un registro
async function updateRecord() {
    const id = document.getElementById('editId').value;
    const nombre = document.getElementById('editName').value;
    const email = document.getElementById('editEmail').value;
    const estado = document.getElementById('editStatus').value;

    try {
        const response = await fetch(`${API_URL}/records/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, email, estado })
        });

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
            loadRecords();
            alert('Registro actualizado exitosamente');
        } else {
            alert('Error al actualizar el registro');
        }
    } catch (error) {
        console.error('Error al actualizar registro:', error);
        alert('Error al actualizar el registro');
    }
}

// Función para preparar la eliminación
function prepareDelete(id) {
    document.getElementById('deleteId').value = id;
    new bootstrap.Modal(document.getElementById('deleteModal')).show();
}

// Función para eliminar un registro
async function deleteRecord() {
    const id = document.getElementById('deleteId').value;

    try {
        const response = await fetch(`${API_URL}/records/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            bootstrap.Modal.getInstance(document.getElementById('deleteModal')).hide();
            loadRecords();
            alert('Registro eliminado exitosamente');
        } else {
            alert('Error al eliminar el registro');
        }
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        alert('Error al eliminar el registro');
    }
}

// Cargar registros al iniciar la página
document.addEventListener('DOMContentLoaded', loadRecords);
</script>


    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>


----------------------------------------------------------------------------------------------------------------------
//insertar los dueños en mi base de datos personal
SELECT * FROM mascotas

CREATE TABLE duenos (
    id SERIAL,
    rut VARCHAR,
    nombre VARCHAR,
    apellido VARCHAR,
    CONSTRAINT pk_duenos PRIMARY KEY (id)
);

ALTER TABLE mascotas
ADD COLUMN id_dueno INTEGER,
ADD CONSTRAINT fk_mascotas_duenos FOREIGN KEY (id_dueno) REFERENCES duenos(id);

SELECT * FROM duenos

INSERT INTO duenos(id, rut, nombre, apellido)
VALUES(1,'15542123-4', 'Juan Carlos', 'Bodoque');
INSERT INTO duenos(id, rut, nombre, apellido)
VALUES(2,'18542123-4', 'Esteban', 'Paredes');
INSERT INTO duenos(id, rut, nombre, apellido)
VALUES(3,'15547123-3', 'Sydney', 'Sweeney');




//CARGA EAGER Mascotas.findAll({
    include: Dueno
}).then((datos) => {
    console.log(datos.map((dato) => {
        return dato.toJSON();
    }));
});*/