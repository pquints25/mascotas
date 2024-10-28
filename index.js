const Server = require("./server/server");

const server = new Server();

server.listen();



/* PRIMER PASO PARA SINCRONIZAR BBDD const Mascotas = require("./models/mascotas");

Mascotas.sync();
 */