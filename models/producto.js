const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose,2);
const mongoosePaginate = require('mongoose-paginate-v2');

//Variables para las validaciones propias
let validaNombre = (nombre) => {

    const regExp = new RegExp(/^[a-zA-Z0-9 ]+$/);

    return (!nombre)? false: regExp.test(nombre.toString());

};

let validaNumero = (numero) => {

    const regExp = new RegExp(/^\d+$/);

    return (!numero)? false: regExp.test(numero.toString());

};

///Variables usadas para establecer el mensaje personalizado que se guarda en el log
const numeroValidators = [
    {

        validator: validaNumero,
        message: 'Debe ser un número entero positivo.'

    }
];

const nombreValidators = [
    {

        validator: validaNombre,
        message: 'El nombre del producto no puede contener carácteres especiales ni el carácter ñ.'

    }
];

//Creación del esquema
const ProductoScheme = new mongoose.Schema(
    {

        referencia: {

            type: Number,
            unique: [true, 'Ya existe un producto con esta referencia.'],
            required: [true, 'La referencia del producto es necesaria. '],
            validate: numeroValidators

        },

        categoria: {

            type: String,
            enum: {
                    values: ['defensa','fuego','competicion','seguridad'],
                    message: 'La categoría no esta soportada.'
                },
            required: [true, 'La categoria del producto es necesaria.']

        },

        nombre: {

            type: String,
            required: [true, 'El nombre del producto es necesario.'],
            minLength: [3, 'El nombre del producto no puede contener menos de 3 carácteres'],
            validate: nombreValidators

        },

        descripcion: {

            type: String,
            required: [true, 'La descripción del producto es necesario.'],
            minLength: [5, 'La descripción debe de tener al menos 5 carácteres'],
            maxLength: [3000, 'La descripción debe de tener menos de 3000 carácteres']

        },

        precio: {

            type: Float,
            required: [true, 'El precio del producto es neceario.'],
            min: [0.0, 'El precio del producto no puede ser negativo.']

        },

        tasa: {

            type: Number,
            required: [true, 'La tasa del producto es necesario.'],
            validate: numeroValidators

        },

        stock: {

            type: Number,
            required: [true, 'El stock del producto es necesario.'],
            validate: numeroValidators

        },

        stockMinimo:{

            type: Number,
            required: [true, 'El stock mínimo del producto es necesario.'],
            validate: numeroValidators

        },
        
        habilitado: {

            type: Boolean,
            required: [true,'Es necesario indicar si el usuario esta habilitado.']

        },

        proveedores:{

            type: Array,
            required: [true,'Es necesario indicar el o los proveedores.']

        }

    },
    {
        versionKey: false,
        timestamps: true
    }
);

//Campos virtuales los cuales serán enviados a los servicios que los requieran
ProductoScheme.virtual('creacionProducto')
  .set(function(fecha) {
    this.createdAt = new Date(fecha);
  })
  .get(function(){
    return this.createdAt.toISOString().substring(0,10)+" "+this.createdAt.toISOString().substring(11,19);
});

ProductoScheme.virtual('modificacionProducto')
  .set(function(fecha) {
    this.updatedAt = new Date(fecha);
  })
  .get(function(){
    return this.updatedAt.toISOString().substring(0,10)+" "+this.updatedAt.toISOString().substring(11,19);
});

//Ejecución para activar la paginación en el modelo
ProductoScheme.plugin(mongoosePaginate);

//Exportación y creación del modelo
module.exports = mongoose.model('productos',ProductoScheme);