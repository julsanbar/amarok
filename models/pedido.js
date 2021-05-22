const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose,2);
const mongoosePaginate = require('mongoose-paginate-v2');


//Variables para las validaciones propias
let validaReferencia = (referencia) => {

  const regExp = new RegExp(/^[P]\d+$/);

  return (!referencia)? false: regExp.test(referencia.toString());

};

///Variables usadas para establecer el mensaje personalizado que se guarda en el log
const referenciaValidators = [
  {

      validator: validaReferencia,
      message: 'La referencia debe ser P seguido de un número.'

  }
];


const PedidoScheme = new mongoose.Schema(
    {

        referencia: {

            type: String,
            unique: [true, 'La referencia debe ser única'],
            required: [true, 'La referencia es necesario para el pedido'],
            validate: referenciaValidators

        },

        estado: {

            type: String,
            enum: 
              {
                values: ['cancelado','enviado','entregado'],
                message: 'El estado no esta soportado'
              },
            required: [true, 'El estado es necesario']

        },

        fechaPedido: {

          type: Date,
          default: Date.now(),
          min: '2019-01-01',
          max: Date.now()

        },

        productos: {

            type: Array,
            required: [true, 'Es necesario indicar los productos']

        },

    },
    {
        versionKey: false,
        timestamps: true
    }
);
/**
 * REALIZAR EL CAMPO FECHA PEDIDO DE FORMA ORDINARIA.
 * NO REALIZAR ESQUEMAS VIRTUALES
 * 
 */
//Campo virtual: creación del pedido formato yyyy-mm-dd hh:mm:ss
//Este campo solo sera visible cuando se envie al front toda la información
PedidoScheme.virtual('creacionPedido')
  .set(function(fecha) {
    this.createdAt = new Date(fecha);
  })
  .get(function(){
    return this.createdAt.toISOString().substring(0,10)+" "+this.createdAt.toISOString().substring(11,19);
});

PedidoScheme.virtual('modificacionPedido')
  .set(function(fecha) {
    this.updatedAt = new Date(fecha);
  })
  .get(function(){
    return this.updatedAt.toISOString().substring(0,10)+" "+this.updatedAt.toISOString().substring(11,19);
});

PedidoScheme.virtual('fecha')
  .get(function(){
    return this.fechaPedido.toISOString().substring(0,10);
});

PedidoScheme.virtual('hora')
  .get(function(){
    return this.fechaPedido.toISOString().substring(11,19);
});

PedidoScheme.plugin(mongoosePaginate);

module.exports = mongoose.model('pedidos',PedidoScheme);