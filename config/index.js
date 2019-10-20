//Dotenv es un paquete que nos ayuda a configurar nuestras variables de entorno
require('dotenv');

//El objeto config nos ayudara a definir todas las variables de entorno
//necesarias para configurar nuestro servidor

//Es bueno crear este archivo pues si queremos hacer un cambio en toda nuestra
//apliacion, solo debemos de hacerlo en este archivo
const config = {
  dev: process.env.NODE_ENV != 'production',
  port: process.env.PORT || 3000
};

module.exports = { config };
