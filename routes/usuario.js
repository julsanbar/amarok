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

//Crea una cuenta de usuario
router.post(

    `/crear`,
    controller.crearUsuario

);

//Inicia sesión en la cuenta
router.post(

    `/iniciar`,
    controller.iniciarSesion

);


module.exports = router;