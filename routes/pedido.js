const express = require('express');
const router = express.Router();

//PENSAR SI REDIRIGIR CON ANGULAR
const path = 'home';
const controller = require('../controllers/pedido');

router.get(

    `/${path}`,
    controller.getPedidos

);

router.post(

    `/${path}`,
    controller.insertData

);

module.exports = router;