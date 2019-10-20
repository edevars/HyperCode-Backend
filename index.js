//importamos express para poder crear nuestro servidor
const express = require('express');

//Creamos una instancia de express
const app = express();

//Traemos la configuracion de nuestro proyecto
//a traves de las variables de entorno
const { config } = require('./config');

//Importamos nuestra API de usuarios
const usersApi = require('./routes/users');

//Hacemos uso de la API pasando como parametro
//nuestra apliacicon de express
usersApi(app);

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
