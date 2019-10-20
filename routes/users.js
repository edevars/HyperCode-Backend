const express = require('express');

const { usersMock } = require('../utils/mocks/users');


function usersApi(app) {
  
  const router = express.Router();

  app.use('/api/users', router);

  router.get('/', async function(req, res, next) {
    try {

      const users = await Promise.resolve(usersMock);

      res.status(200).json({
        data: users,
        message: 'Usuarios listados'
      });
    } catch (error) {
      next(error);
    }
  });

  //Obtenemos solo un usuario dependiendo su id con el metodo GET y el query param userId
  router.get('/:userId', async function(req, res, next) {
    try {

      const user = await Promise.resolve(usersMock[0]);

      res.status(200).json({
        data: user,
        message: 'Usuario listado'
      });
    } catch (error) {
      next(error);
    }
  });

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

 
}

module.exports = usersApi;
