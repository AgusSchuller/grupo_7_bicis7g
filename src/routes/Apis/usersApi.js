const express = require('express');
const router = express.Router();
const usersApiController = require('../../controllers/apis/usersApiController');

//Rutas
//Listado de usuarios
router.get('/', usersApiController.list);
//Detalle de una usuarios
router.get('/:id', usersApiController.detail);

module.exports = router;