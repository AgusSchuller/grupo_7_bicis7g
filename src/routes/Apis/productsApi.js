const express = require('express');
const router = express.Router();
const prodApiController = require('../../controllers/apis/prodApiController');

//Rutas
//Listado de usuarios
router.get('/', prodApiController.list);
//Detalle de una usuarios
router.get('/:id', prodApiController.detail);

module.exports = router;