const express = require('express');
const mascotas = require("../routes/mascotas");
const dueno = require("../routes/dueno")

class Server {
    constructor(){
        this.app = express();
        this.port = 3001;
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