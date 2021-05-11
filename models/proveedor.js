const mongoose = require('mongoose');

//Variables para las validaciones propias
let validaReferencia = (referencia) => {

const regExp = new RegExp(/^PR\d+$/);

return (!referencia)? false: regExp.test(referencia.toString());

};

let validaNombre = (nombre) => {

    const regExp = new RegExp(/^[a-zA-Z ]+$/);

    return (!nombre)? false: regExp.test(nombre.toString());

};

let validaEmail = (email) => {

    const regExp = new RegExp(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/);

    return (!email)? false: regExp.test(email.toString());

};

let validaCif = (cif) => {

    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);

    return (!cif)? false: !regExp.test(cif.toString());

};

let validaTelefono = (telefono) => {

    const regExp = new RegExp(/^\d+$/);

    return (!telefono)? false: regExp.test(telefono.toString());

};

///Variables usadas para establecer el mensaje personalizado que se guarda en el log
const referenciaValidators = [
{

    validator: validaReferencia,
    message: 'La referencia debe ser PR seguido de un número.'

}
];

const nombreValidators = [
{

    validator: validaNombre,
    message: 'El nombre debe estar compuesto por letras y/o espacios.'

}
];

const emailValidators = [
{

    validator: validaEmail,
    message: 'El email no es válido.'

}
];

const cifValidators = [
{

    validator: validaCif,
    message: 'El cif debe de estar compuesto por números, letras y/o espacios.'

}
];

const telefonoValidators = [
{

    validator: validaTelefono,
    message: 'El telefono debe estar compuesto por números.'

}
];

const ProveedorScheme = new mongoose.Schema(
    {

        referencia: {

            type: String,
            unique: [true, 'La referencia es necesaria.'],
            required: [true, 'Ya existen esta referencia.'],
            validate: referenciaValidators

        },

        nombre: {

            type: String,
            required: [true, 'El campo nombre es necesario.'],
            validate: nombreValidators,
            minLength: [5, 'La nombre debe de tener al menos 5 carácteres']

        },

        cif: {

            type: String,
            required: [true, 'El campo cif es necesario.'],
            validate: cifValidators,
            minLength: [5, 'El cif debe de tener al menos 5 carácteres'],
            maxLength: [50, 'El cif debe de tener menos de 50 carácteres']

        },

        direccionPostal: {

            type: String

        },

        codigoPostal: {

            type: String

        },

        email: {

            type: String,
            required: [true, 'El campo email es necesario.'],
            unique: [true, 'Ya existe este email.'],
            validate: emailValidators,
            minLength: [5, 'El email debe de tener al menos 5 carácteres'],
            maxLength: [50, 'El email debe de tener menos de 50 carácteres']

        },

        telefono: {

            type: String,
            required: [true, 'El campo teléfono es necesario.'],
            validate: telefonoValidators,
            minLength: [9, 'El telefono debe de tener al menos 9 carácteres'],
            maxLength: [15, 'El telefono debe de tener menos de 15 carácteres']

        },

        pais: {

            type: String,
            minLength: [2, 'El pais debe de tener al menos 2 carácteres'],
            maxLength: [20, 'El pais debe de tener menos de 20 carácteres']

        },

        habilitado: {

            type: Boolean,
            required: [true, 'El campo habilitado es necesario.']

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