const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose,2);

//FALTAN VALIDADORES ¿CONTROLLER O MODELS?
//TIENE SENTIDO PONER EL PRECIO TOTAL DEL PEDIDO EN EL PEDIDO, O SE DEJA COMO CALCULO
const PedidoScheme = new mongoose.Schema(
    {

        referencia: {

            type: String,
            unique: true,
            required: true

        },

        estado: {

            type: String,
            enum: ['cancelado','enviado','entregado'],
            default: 'enviado',
            required: true

        },

        productos: {

            type: Array,
            required: true

        },

    },
    {
        versionKey: false,
        timestamps: true
    }
);

//Campo virtual: creación del pedido formato yyyy-mm-dd hh:mm:ss
//Este campo solo sera visible cuando se envie al front toda la información
PedidoScheme.virtual('fechaPedido')
  .set(function(fecha) {
    this.createdAt = new Date(fecha);
  })
  .get(function(){
    return this.createdAt.toISOString().substring(0,10)+" "+this.createdAt.toISOString().substring(11,19);
  });

//Campo virtual: creación del pedido formato yyyy-mm-dd hh:mm:ss
//Este campo solo sera visible cuando se envie al front toda la información
PedidoScheme.virtual('fechaModificacionPedido')
  .set(function(fecha) {
    this.updatedAt = new Date(fecha);
  })
  .get(function(){
    return this.updatedAt.toISOString().substring(0,10)+" "+this.updatedAt.toISOString().substring(11,19);
  });

module.exports = mongoose.model('pedidos',PedidoScheme);