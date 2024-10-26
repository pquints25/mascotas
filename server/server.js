const express = require('express');
const mascotas = require("../routes/mascotas");

class Server {
    constructor(){
        this.app = express();
        this.port = 3000;
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