# Creando una API Restful en express

Cuando hacemos aplicaciones web estamos acostumbrados a pensar unicamente en el frontend, es decir, el HTML y CSS. Sin embargo el encargado de desarrollar toda la lógica de negocios, mandar e insertar información a nuestra base de datos, o hacer la autenticación de usuarios es el backend.

El backend es creado mediante un servidor, en nuestro caso lo haremos con express, lo usual para saber como construir nuestro servidor de servicios web es siguiendo una arquitectura llamada REST.

![Backend vs frontend](https://www.dropbox.com/s/b4zrc5aik33g2kp/backvsfront.jpeg?raw=1)

## Que es REST?

REST es un estilo de arquitectura para crear web services, no es un estándar pero es considerada una especificación creada por Roy Fielding, quien es cofundador de Apache Software Foundation.

Para poder usar REST debemos hacer uso de los verbos http (si quieres mas info dale click [aqui](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)) donde cada ruta que nosotros definamos para nuestra api podrá regresar o insertar diferentes valores dependiendo el verbo http que usemos.

| URL    |                   /api/usuarios                   |                               /api/usuarios:id |
| ------ | :-----------------------------------------------: | ---------------------------------------------: |
| GET    | lista a todos los usuarios dentro de la coleccion | lista solo al usuario que coincida con el 'id' |
| PUT    |           Remplaza en toda la coleccion           |  Remplaza o crea solo UN usuario en especifico |
| PATCH  |                   No hace nada                    |           Actualiza a un usuario en especifico |
| POST   |       Crea un nuevo usuario en la coleccion       |                                   No hace nada |
| DELETE |             Elimina toda la coleccion             | Elimina a un usuario en especifico con el 'id' |

En este proyecto en especifico crearemos un backend para un foro de desarrllo llamado _Hypercode_

## Creando las rutas en nuestra app

Las rutas (tambien llamadas endpoints) son las urls que da nuestro servidor para que otras aplicaciones puedan consumir datos, imaginatelas como una especie de puente que sirve para conectar los datos. Estas rutas pueden ser aplicadas a diferentes verbos http, es decir dependiendo de con que verbo mandemos llamar la ruta, es la accion que realizará.

Para esto crearemos una carpeta llamada **routes**, en la cual agregaremos las rutas de nuestras APIs. Primero empezaremos con el metodo get de usuarios, definido de la siguiente manera:

```javascript
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
```

Cabe aclarar que debemos hacer uso de mocks, los cuales son datos falsos que simulan una base de datos, para crear diferentes mocks dependiendo de tus necesidades puedes usar [mockaroo](https://mockaroo.com/).

Los usuarios de un foro suelen estar modelados de la siguiente manera:

```javascript
    {
        id: 1,
        username: 'uwilmore0',
        email: 'ekittley0@reference.com',
        password: 'kHfS7AzpK3'
    }
```

Por ultimo para hacer uso de nuestra ruta debemos declarar su uso en nuestro archivo principal index de express:

```javascript
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
```

## Creando un CRUD con los verbos HTTP

Con los verbos http podemos realizar las funcionalidades de un CRUD.

| Funcion | Verbo  |
| ------- | ------ |
| CREATE  | POST   |
| READ    | GET    |
| UPDATE  | PUT    |
| DELETE  | DELETE |

Para la creacion de nuestra ruta solo implementamos el verbo GET, para implementar los otros 3 restantes es muy sencillo:

```javascript
//Creamos un usuario con el metodo post
router.post('/', async function(req, res, next) {
  try {
    const createdUserId = await Promise.resolve(usersMock[0].id);

    res.status(201).json({
      data: createdUserId,
      message: 'Usuario creado'
    });
  } catch (error) {
    next(error);
  }
});

//Actualizamos un usuario por su id con el metodo PUT
router.put('/:userId', async function(req, res, next) {
  try {
    const updatedUserId = await Promise.resolve(usersMock[0].id);

    res.status(200).json({
      data: updatedUserId,
      message: 'Usuario actualizado'
    });
  } catch (error) {
    next(error);
  }
});

//Actualizamos un usuario por su id con el metodo PUT
router.delete('/:userId', async function(req, res, next) {
  try {
    const deletedUserId = await Promise.resolve(usersMock[0].id);

    res.status(200).json({
      data: deletedUserId,
      message: 'Usuario eliminado'
    });
  } catch (error) {
    next(error);
  }
});
```
