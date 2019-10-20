//importamos express para poder crear nuestro servidor
const express = require('express');

//Creamos una instancia de express
const app = express();

//Traemos la configuracion de nuestro proyecto
//a traves de las variables de entorno
const { config } = require('./config');

//Creamos una ruta, es decir la url o endpoint donde
//consumiremos informacion o madaremos informacion

//Las rutas estan vinculadas a los verbos http

// app.get('[url donde queremos crear el endpont]', function(req,res){
//     La funcion tiene dos parametros, uno es el request y el otro
//     es el response

//     El request trae todos las cosas que nostros pudimos enviar desde
//     nuestro frontend, como lo pueden ser los datos de un usuario

//     El response son cosas que nosotros podemos mandar al frontend,
//     puede ser informacion de nuestra base de datos
//     }

// })

//Cuando el frontend use el metodo http get en la ruta principal , 
//usualmente se le dice que es el Home ('/') Entonces mandaremos 
//un mensaje que diga "Hello World"
app.get('/', function(req, res) {
    //Usuarios que queremos mandar, normalmente proviene de una BD
    res.send('Hello World');
  });

//Cuando el frontend use el metodo http get en la ruta json ('/json')
//Entonces mandaremos los datos de un usuario
app.get('/json', function(req, res) {
  //Usuarios que queremos mandar, normalmente proviene de una BD
  const usuario = { name: 'Enrique', lastName: 'Devars', age: 22 };
  res.json(usuario);
});

//Iniciamos nuestro servidor con nuestro puerto del archivo de configuracion
//El segundo parametro es una funcion como en la cracion de ruta
//a estas funciones se les llaman funcionas calback

//El calback de app.listen nos permite agragar acciones que queremos
//hacer cuando el servidor esta a la escucha, en este caso solo imprimiremos
//la direccion donde esta escuchando

app.listen(config.port, function() {
  console.log(`Listening http://localhost:${config.port}`);
});
