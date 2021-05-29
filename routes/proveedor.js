const express = require('express');
const router = express.Router();

//TEST
//const path = 'proveedor';
const controller = require('../controllers/proveedor');

//TEST
/*router.get(

    `/${path}`,
    controller.getProveedores

);*/

//TEST
/*router.post(

    `/${path}`,
    controller.insertData

);*/

router.get(

    '/getPaginationProveedores/:page',
    controller.getPaginationProveedores

);

module.exports = router;