const express = require('express');
const router = express.Router();

//PENSAR SI REDIRIGIR CON ANGULAR
const path = 'home';
const controller = require('../controllers/producto');

router.get(

    `/`,
    controller.getMasVendidos

);

module.exports = router;