const producto = require('../models/producto');
const pedido = require('../models/pedido');
//db.getCollection('producto').find({},{"referencia":1,"_id":0}).toArray()[0]["referencia"]
//SE DEBE DE REALIZAR UN AGREGATE YA QUE SE TIENE QUE HACER OTRA QUERY
/*exports.getMasVendidos = (req, res) => {

    model.find({},{"referencia":1,"_id":0}).exec((err,productos) => {

        if(err) return res.status(500).send({message: 'Error en el servidor'});

        if(productos){

            //productos = productos[0]["referencia"];

            //console.log(call[0]["referencia"])

            for (let i = 0; i < productos.length; i++) {
                const element = productos[i]["referencia"];
                console.log(element);
            }

            return res.status(200).send({
                productos
            });
        }else{
            return res.status(404).send({
                message: 'No hay productos'
            });
        }
        
    });

}*/

const getMasVendidos = async (req,res) => {

    const referencias = await producto.find({},{"referencia":1,"_id":0},(err,docs)=>{})
    const nombres = await producto.find({},{"nombre":1,"_id":0},(err,docs)=>{})

    const result = referencias[0]["referencia"]+"  "+nombres[0]["nombre"];

    res.send({
        result
    })

}

/**
 * 
 *     model.find({},(err,docs)=>{

        res.send({
            items:docs
        })

    })
 * 
 * 
 */

/**
 * function getNotas(req, res){
 
        // Usamos el método find sobre nuesta entidad Nota y ordenamos los resultados
    Nota.find({}).sort({'_id':-1}).exec((err, notas) => {
        if(err) return res.status(500).send({message: 'Error en el servidor'});
         
                     // Devolvemos el resultado de la query en json
            if(notas){
                return res.status(200).send({
                    notas
                });
            }else{
                return res.status(404).send({
                    message: 'No hay notas'
                });
            }
         
    });
}

 */

module.exports = {

    getMasVendidos

};