const express = require('express');
const router = express.Router();

//TEST
const path = "producto";
const controller = require('../controllers/producto');

router.get(

    `/masVendidos`,
    controller.getMasVendidos

);

router.get(

    '/pagination/:page',
    controller.getPagination

);

router.get(

    '/paginationCompeticion/:page',
    controller.getPaginationCompeticion

);

router.get(

    '/paginationFuego/:page',
    controller.getPaginationFuego

);

router.get(

    '/paginationDefensa/:page',
    controller.getPaginationDefensa

);

router.get(

    '/paginationSeguridad/:page',
    controller.getPaginationSeguridad

);

//TEST
router.post(

    `/${path}`,
    controller.insertData

);

router.get(

    '/getPaginationProductos/:page',
    controller.getPaginationProductos

);

router.post(

    '/crearProducto',
    controller.crearProducto

);

module.exports = router;