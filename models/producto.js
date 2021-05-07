const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose,2);

//FALTAN VALIDADORES ¿CONTROLLER O MODELS?
/**
 * REALIZAR VALIDACIONES EN EL MODELO MEDIANTE:
 *  METHODS Y PRE DE SCHEMA DE ESTA FORMA VALIDAMOS LOS DATOS
 *  RECIBIDOS
 */
const ProductoScheme = new mongoose.Schema(
    {

        referencia: {

            type: Number,
            unique: true,
            required: true

        },

        categoria: {

            type: String,
            enum: ['defensa','fuego','competicion','seguridad'],
            required: true

        },

        nombre: {

            type: String,
            required: true

        },

        descripcion: {

            type: String

        },

        precio: {

            type: Float,
            required: true

        },

        tasa: {

            type: Number,
            required: true

        },

        stock: {

            type: Number,
            required: true

        },

        stockMinimo:{

            type: Number,
            required: true

        },

        proveedores:{

            type: Array

        }

    },
    {
        versionKey: true,
        timestamps: true
    }
);

module.exports = mongoose.model('productos',ProductoScheme);