const express = require('express');
const router = express.Router();

//PENSAR SI REDIRIGIR CON ANGULAR
//TEST
const path = 'pedido';
const controller = require('../controllers/pedido');

//TEST
router.get(

    `/${path}`,
    controller.getPedidos

);

//TEST
router.post(

    `/${path}`,
    controller.insertData

);

//Test FACTURA
router.get(
    //OK PASO DE DATOS 
    `/factura/:idCliente/:pedido`,
    controller.factura

);

router.get(

    '/paginationPedidos/:page/:id',
    controller.getPaginationPedidos

);

module.exports = router;