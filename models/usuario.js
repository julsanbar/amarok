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

        fechaNacimiento: {

            type: Date,
            required: true

        },

        tipo: {
            //El administrador dara permisos de empleado
            type: String,
            enum: ['registrado','administrador','empleado'],
            default: 'registrado'

        },

        dni: {

            type: String,
            required: true

        },

        licencia: {

            type: String,
            enum: ['competicion','seguridad','fuego','null'],
            default: 'null'

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
        versionKey: false,
        timestamps: true
    }
);

UsuarioScheme.virtual('creacionUsuario')
  .set(function(fecha) {
    this.createdAt = new Date(fecha);
  })
  .get(function(){
    return this.createdAt.toISOString().substring(0,10)+" "+this.createdAt.toISOString().substring(11,19);
});

UsuarioScheme.virtual('modificacionUsuario')
  .set(function(fecha) {
    this.updatedAt = new Date(fecha);
  })
  .get(function(){
    return this.updatedAt.toISOString().substring(0,10)+" "+this.updatedAt.toISOString().substring(11,19);
});

module.exports = mongoose.model('usuarios',UsuarioScheme);