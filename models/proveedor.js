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
        versionKey: false,
        timestamps: true
    }
);

ProveedorScheme.virtual('creacionProveedor')
  .set(function(fecha) {
    this.createdAt = new Date(fecha);
  })
  .get(function(){
    return this.createdAt.toISOString().substring(0,10)+" "+this.createdAt.toISOString().substring(11,19);
});

ProveedorScheme.virtual('modificacionProveedor')
  .set(function(fecha) {
    this.updatedAt = new Date(fecha);
  })
  .get(function(){
    return this.updatedAt.toISOString().substring(0,10)+" "+this.updatedAt.toISOString().substring(11,19);
});

module.exports = mongoose.model('proveedores',ProveedorScheme);