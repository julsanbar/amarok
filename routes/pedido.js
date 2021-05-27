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

router.get(

    `/factura/:idCliente/:pedido`,
    controller.factura

);

router.get(

    '/paginationPedidos/:page/:id',
    controller.getPaginationPedidos

);

router.get(

    '/getProductosPedidos/:refProductos',
    controller.getProductosPedidos

);

router.post(

    '/cancelarPedido',
    controller.cancelarPedido

);

router.post(

    '/crearPedido',
    controller.crearPedido

);

router.get(

    '/paginationPedidosAdmin/:page',
    controller.paginationPedidosAdmin

);

router.post(

    '/idClientePedido',
    controller.idClientePedido

);

module.exports = router;