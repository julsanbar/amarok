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

router.post(

    `/crear`,
    controller.crearUsuario

);

module.exports = router;