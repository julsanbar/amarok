const express = require('express');
const router = express.Router();

//PENSAR SI REDIRIGIR CON ANGULAR
const path = 'home';
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

module.exports = router;