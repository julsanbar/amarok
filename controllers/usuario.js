const usuario = require('../models/usuario');

//TEST
const getUsuarios = async (req, res) => {

    await usuario.findOne({},(err,docs)=>{
        
        //console.log("creacion---",docs.fechaPedido);
        //console.log("actualizacion---",docs.fechaModificacionPedido);

        res.send({
            item:docs
        })

    })

}

const crearUsuario = async (req,res) => {

    const data = req.body

    console.log("PARAMETROS ----- ",data)
    console.log("ESQUEMA ------",usuario)

    //res.send({data})

    await usuario.create(data,(err,docs)=>{

        if(err){
            console.log(err);
            res.send({error:'ERROR'},422)

        }else{
            
            res.send({data:docs})

        }

        
    });

}

module.exports = {

    getUsuarios,
    crearUsuario

};