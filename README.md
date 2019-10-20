# Creando una API Restful en express

Cuando hacemos aplicaciones web estamos acostumbrados a pensar unicamente en el frontend, es decir, el HTML y CSS. Sin embargo el encargado de desarrollar toda la lógica de negocios, mandar e insertar información a nuestra base de datos, o hacer la autenticación de usuarios es el backend. 

El backend es creado mediante un servidor, en nuestro caso lo haremos con express, lo usual para saber como construir nuestro servidor de servicios web es siguiendo una arquitectura llamada REST.

![Backend vs frontend](https://www.dropbox.com/s/b4zrc5aik33g2kp/backvsfront.jpeg?raw=1)


## Que es REST?

REST es un estilo de  arquitectura para crear web services, no es un estándar pero es considerada una especificación creada por Roy Fielding, quien es cofundador de Apache Software Foundation.

Para poder usar REST debemos hacer uso de los verbos http (si quieres mas info dale click [aqui](https://developer.mozilla.org/es/docs/Web/HTTP/Methods)) donde cada ruta que nosotros definamos para nuestra api podrá regresar o insertar diferentes valores dependiendo el verbo http que usemos.

| URL        | /api/usuarios           | /api/usuarios:id  |
| ------------- |:-------------:| -----:|
| GET      | lista a todos los usuarios dentro de la coleccion | lista solo al usuario que coincida con el 'id' |
| PUT      | Remplaza en toda la coleccion | Remplaza o crea solo UN usuario en especifico |
| PATCH      | No hace nada | Actualiza a un usuario en especifico |
| POST      | Crea un nuevo usuario en la coleccion | No hace nada |
| DELETE      | Elimina toda la coleccion | Elimina a un usuario en especifico con el 'id' |