const express = require('express');
const router = express.Router();

//PENSAR SI REDIRIGIR CON ANGULAR
const path = 'producto';
const controller = require('../controllers/producto');

router.get(

    `/`,
    controller.getMasVendidos

);

//TEST
router.post(

    `/${path}`,
    controller.insertData

);

module.exports = router;