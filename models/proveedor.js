const mongoose = require('mongoose');

const ProveedorScheme = new mongoose.Schema(
    {

        referencia: {

            type: String,
            unique: true,
            required: true

        },

        nombre: {

            type: String,
            required: true

        },

        cif: {

            type: String,
            required: true

        },

        direccionPostal: {

            type: String

        },

        codigoPostal: {

            type: String

        },

        email: {

            type: String,
            required: true,
            unique: true

        },

        telefono: {

            type: String,
            required: true

        },

        pais: {

            type: String

        },

        habilitado: {

            type: Boolean,
            required: true

        }

    },
    {
        versionKey: true,
        timestamps: true
    }
);

module.exports = mongoose.model('proveedores',ProveedorScheme);