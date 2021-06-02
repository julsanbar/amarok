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

router.get(

    '/getRol/:id',
    controller.getRol

);

router.post(

    '/deshabilitar',
    controller.deshabilitar

);

router.post(

    '/perfil',
    controller.perfil

);

router.post(

    '/modificaPerfil',
    controller.modificaPerfil

);

router.get(

    '/paginationUsuariosAdmin/:page',
    controller.paginationUsuariosAdmin

);

router.get(

    '/pedidosUsuario/:refPedidos',
    controller.pedidosUsuario

);

router.get(

    '/paginationUsuariosEmpleado/:page',
    controller.paginationUsuariosEmpleado

);

router.get(

    '/usuarioPedido/:ref',
    controller.usuarioPedido

);

router.post(

    '/enviaEmail',
    controller.enviaEmail

)

module.exports = router;