const mongoose = require('mongoose');
const bcrypt = require('bcrypt-node');

//Variables para las validaciones propias
let validaNombre = (nombre) => {

    const regExp = new RegExp(/^([A-Z]{1}[a-zñáéíóú]+[\s]*)+$/);

    return (!nombre)? false: regExp.test(nombre.toString());

};

let validaApellidos = (apellidos) => {

    const regExp = new RegExp(/^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$/);

    return (!apellidos)? false: regExp.test(apellidos.toString());

};

let validaDni = (dni) => {

    const regExp = new RegExp(/^[0-9]{8,8}[A-Za-z]$/);

    return (!dni)? false: regExp.test(dni.toString());

};
  
let validaEmail = (email) => {

    const regExp = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);

    return (!email)? false: regExp.test(email.toString());

};

let validaUsuario = (usuario) => {

    const regExp = new RegExp(/^([a-zA-Z0-9ñáéíóú]+[\s]*)+$/);

    return (!usuario)? false: regExp.test(usuario.toString());

};

let validaTelefono = (telefono) => {

    const regExp = new RegExp(/^[9|6|7|8]{1}([\d]{2}[-]*){3}[\d]{2}$/);

    return (!telefono)? false: regExp.test(telefono.toString());

};

let validaDireccion = (direccion) => {

    const regExp = new RegExp(/^[^$%#&|*+@<>.#]*$/);

    return (!direccion)? false: regExp.test(direccion.toString());

};

let validaPassword = (password) => {

    const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%"*?&])([A-Za-z\d$@"$!%*?&]|[^ ]){8,15}$/);

    return (!password)? false: regExp.test(password.toString());

};

let validaCodigoPostal = (codigoPostal) => {

    const regExp = new RegExp(/^(?:0[1-9]\d{3}|[1-4]\d{4}|5[0-2]\d{3})$/);

    return (!codigoPostal)? false: regExp.test(codigoPostal.toString());

};

///Variables usadas para establecer el mensaje personalizado que se guarda en el log
const nombreValidators = [
    {

        validator: validaNombre,
        message: 'El nombre no puede contener carácteres especiales.'

    }
];

const apellidosValidators = [
    {

        validator: validaApellidos,
        message: 'Los apellidos solo deben estar compuestos por letras y espacios en blanco.'

    }
];

const dniValidators = [
    {

        validator: validaDni,
        message: 'El dni debe estar compuesto por 8 dígitos y una letra.'

    }
];

const emailValidators = [
    {

        validator: validaEmail,
        message: 'Email incorrecto'

    }
];

const usuarioValidators = [
    {

        validator: validaUsuario,
        message: 'Usuario incorrecto'

    }
];

const telefonoValidators = [
    {

        validator: validaTelefono,
        message: 'Teléfono incorrecto'

    }
];

const direccionValidators = [
    {

        validator: validaDireccion,
        message: 'Dirección incorrecta'

    }
];

const passwordValidators = [
    {

        validator: validaPassword,
        message: 'Debe contener mínimo 1 minuscula, 1 mayuscula, 1 caracter especial y 1 numero. Su longitud debe ser entre 8 y 15 carácteres.'

    }
];

const codigoPostalValidators = [
    {

        validator: validaCodigoPostal,
        message: 'Código Postal incorrecto'

    }
];

const UsuarioScheme = new mongoose.Schema(
    {

        nombre: {

            type: String,
            required: [true, 'Es necesario un nombre'],
            validate: nombreValidators,
            minLength: [3, 'Longitud mínima de 3 carácteres']

        },
        
        apellidos: {

            type: String,
            required: [true, 'Es necesario indicar al menos un apellido'],
            validate: apellidosValidators

        },
        
        nacimiento: {

            type: Date,
            required: [true,'Es necesario indicar una fecha de nacimiento.']

        },

        tipo: {
            //El administrador dara permisos de empleado
            type: String,
            enum: 
            {
                values: ['registrado','administrador','empleado'],
                message: 'Tipo de usuario no soportado'
            },
            default: 'registrado'

        },
        
        dni: {

            type: String,
            required: [true, 'Es necesario indicar un dni'],
            validate: dniValidators

        },
        
        licencia: {

            type: String,
            enum: 
            {
                values: ['competicion','seguridad','fuego','null'],
                message: 'La licencia indicada no esta soportada'
            },
            default: 'null'

        },

        email: {

            type: String,
            unique: [true,'El email ya existe en la base de datos'],
            required: [true, 'Es necesario indicar un email'],
            validate: emailValidators

        },

        usuario: {

            type: String,
            required: [true,'Es necesario indicar un nombre de usuario'],
            unique: [true,'Ya existe en la base de datos el usuario'],
            minLength: [5, 'Longitud mínima de 5 carácteres'],
            validate: usuarioValidators

        },

        telefono: {

            type: String,
            required: [true,'Es necesario indicar un teléfono'],
            validate: telefonoValidators

        },

        direccion: {

            type: String,
            required: [true,'Es necesario indicar una dirección'],
            validate: direccionValidators,
            minLength: [10, 'Longitud mínima es de 10 carácteres']

        },
        
        password: {

            type: String,
            required: [true,'Es necesario indicar una contraseña.'],
            validate: passwordValidators

        },
        
        habilitado: {

            type: Boolean,
            required: [true,'Es necesario indicar si el usuario esta habilitado.']

        },

        codigoPostal: {

            type: String,
            required: [true,'Es necesario indicar un código postal'],
            validate: codigoPostalValidators

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

UsuarioScheme.pre('save', function(next) {
    if (!this.isModified('password')) {
      return next();
    }
  
    bcrypt.hash(this.password, null, null, (err, hash) => {
        if (err) {
            return next(err);
        } else {
            this.password = hash;
            next();
        }
    });
});
  
UsuarioScheme.methods.comparePasswords = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('usuarios',UsuarioScheme);