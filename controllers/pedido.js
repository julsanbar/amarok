const pedido = require('../models/pedido');

exports.getPedidos = (req, res) => {

    pedido.findOne({},(err,docs)=>{
        
        //console.log("creacion---",docs.fechaPedido);
        //console.log("actualizacion---",docs.fechaModificacionPedido);

        res.send({
            item:docs
        })

    })

}

exports.insertData = (req,res) => {

    const data = req.body

    //res.send({data})

    pedido.create(data,(err,docs)=>{

        if(err){
            console.log(err);
            res.send({error:'ERROR'},422)

        }else{
            
            res.send({data:docs})

        }

        
    });

}