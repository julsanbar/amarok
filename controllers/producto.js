const producto = require('../models/producto');
const pedido = require('../models/pedido');

/**
 * CONTEMPLAR CATCH PARA CADA QUERY
*/

//Función para devolver los 4 productos más vendidos
const getMasVendidos = async (req,res) => {
    
    const productos = await producto.find({},(err,docs)=>{})
    const productosPedidos = await pedido.find({},{"productos":1,"_id":0},(err,docs)=>{})

    var productsPed = [];
    var cantidad = {};
    var reset = new Set();
    var result = new Map();

    for (let i = 0; i < productosPedidos.length; i++) {
            
        const productosPedido = productosPedidos[i]["productos"];
        
        for (let k = 0; k < productosPedido.length; k++) {
            
            const productoPedido = productosPedido[k];

            productsPed.push(productoPedido);
            reset.add(productoPedido+"");

        }

    }

    productsPed.forEach(function(i) { cantidad[i] = (cantidad[i]||0) + 1;});

    for (const iterator of reset) {
        
        result.set(iterator,cantidad[iterator]);

    }

    const sortedMap = new Map( [...result].sort((x, y) => y[1] - x[1]));
    const keys = sortedMap.keys();
    var resultadoKeys = [];
    var resultado = [];

    for (let i = 0; i < 4; i++) {
        
        resultadoKeys.push(keys.next().value);

    }

    for (let i = 0; i < productos.length; i++) {
        const element = productos[i];
        
        if( element["referencia"] == Number.parseInt(resultadoKeys[0])
        || element["referencia"] == Number.parseInt(resultadoKeys[1])
        || element["referencia"] == Number.parseInt(resultadoKeys[2]) 
        || element["referencia"] == Number.parseInt(resultadoKeys[3]) ){

            resultado.push(element);

        }

    }
    
    res.send({productos:resultado});

}

//TEST
const insertData = async (req,res) => {

    const data = req.body

    //console.log("ENVIO----------",data);

    /*if(data.categoria === "asdn"){

        console.log("ENVIO----------",data);

    }*/

    const crear = await producto.create(data,(err,docs)=>{

        if(err){
            console.log(err);
            res.send({error:'ERROR'},422)

        }else{
            
            res.send({data:docs})

        }

        
    });

}

module.exports = {

    getMasVendidos,
    insertData

};