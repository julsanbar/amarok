const express = require('express');
const router = express.Router();

//TEST
const path = "producto";
const controller = require('../controllers/producto');

router.get(

    `/masVendidos`,
    controller.getMasVendidos

);

router.get(

    '/pagination/:page',
    controller.getPagination

);

//TEST
router.post(

    `/${path}`,
    controller.insertData

);

module.exports = router;