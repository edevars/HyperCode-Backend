const express = require('express');
//Hacemos uso de un archivo de mocks, los mocks son datos falsos
const { usersMock } = require('../utils/mocks/users');

//Definimos una funcion userApi para poder crear una ruta
//en nuestra app de express, por eso como parametro tiene app

//Esto lo hacemos para ser dinamicos y establecer que aplicacion de express
//puede hacer uso de nuestra ruta
function usersApi(app) {
  //creamos un router con express
  const router = express.Router();

  //Definimos la ruta principal donde se consumira nuestra api
  app.use('/api/users', router);

  //Le decimos al router que haga uso de nuestra ruta principal
  //cuandp se le haga una peticion GET

  //la ruta que se define es '/' pero hace referencia a '/api/users'
  router.get('/', async function(req, res, next) {
    try {
      //Definimos unos usuarios falsos con nuestro mock
      //Como las peticiones son asincronas hacemos uso de una promesa
      //esto hace la simulacion como si nos conectaramos a una base de datos
      const users = await Promise.resolve(usersMock);

      //Devolvemos un codigo 200 http que siginifica ok
      res.status(200).json({
        //devolcemos como datos a nuestros usuarios
        data: users,
        //devolvemos un mensaje para el cliente
        message: 'Usuarios listados'
      });
    } catch (error) {
      //Si ocurre un error lo podemos manejar con el parametro next
      next(error);
    }
  });
}

module.exports = usersApi;
