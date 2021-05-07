const mongoose = require('mongoose');

const UsuarioScheme = new mongoose.Schema(
    {

        nombre: {

            type: String,
            required: true

        },

        primerApellido: {

            type: String

        },

        segundoApellido: {

            type: String

        },

        tipo: {

            type: String,
            enum: ['registrado','administrador','empleado'],
            default: 'registrado',
            required: true

        },

        dni: {

            type: String,
            required: true

        },

        licencia: {

            type: String,
            enum: ['competicion','seguridad','fuego'],
            default: null

        },

        email: {

            type: String,
            unique: true,
            required: true

        },

        nombreUsuario: {

            type: String,
            required: true,
            unique: true

        },

        telefono: {

            type: String,
            required: true

        },

        direccion: {

            type: String,
            required: true

        },

        password: {

            type: String,
            required: true

        },

        habilitado: {

            type: Boolean,
            required: true

        },

        codigoPostal: {

            type: String,
            required: true

        },

        pedidos: {

            type: Array

        }

    },
    {
        versionKey: true,
        timestamps: true
    }
);

module.exports = mongoose.model('usuarios',UsuarioScheme);