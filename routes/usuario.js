const express = require('express');
const router = express.Router();

//TEST
const path = 'usuario';
const controller = require('../controllers/usuario');

//TEST
router.get(

    `/${path}`,
    controller.getUsuarios

);

//TEST
router.post(

    `/${path}`,
    controller.insertData

);

module.exports = router;