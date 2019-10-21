const express = require('express');
const UsersService = require('../services/users');

function usersApi(app) {
  //Declaramos una instancia de users service
  const usersService = new UsersService();

  const router = express.Router();

  app.use('/api/users', router);

  router.get('/', async function(req, res, next) {
    try {
      //Consumimos nuestro servicio para obtener usuarios
      const users = await usersService.getUsers();

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
    const { userId } = req.params;
    try {
      //Consumimos nuestro servicio para obtener un usuario por id
      const user = await usersService.getUserById({ userId });

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
    const { body: user } = req;
    try {
      //Consumimos nuestro servicio para crear un nuevo usuario
      const createdUserId = await usersService.createUser(user);

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
    const { body: user } = req;
    const { userId } = req.params;
    try {
      //Consumimos nuestro servicio para actualizar un usuario enviando un usuario y un id
      const updatedUserId = await usersService.updateUser({ userId, user });

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
    const { userId } = req.params;
    try {
      //Consumimos nuestro para eliminar un usuario
      const deletedUserId = await usersService.deleteUser({ userId });

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
