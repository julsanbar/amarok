const express = require('express');
const router = express.Router();

//TEST
const path = "producto";
const controller = require('../controllers/producto');

router.get(

    `/masVendidos`,
    controller.getMasVendidos

);

//TEST
router.post(

    `/${path}`,
    controller.insertData

);

module.exports = router;