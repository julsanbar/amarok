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
    let errors = [];

    for (const key in data) {
        
        if(!data[key]){
            
            errors.push('El campo '+key+' no debe estar vacío.');

        }

    }

    if(errors.length > 0){

        return res.send({error:errors});

    }

    const duplicados = await usuario.findOne({$or:[{email: data.email},{usuario: data.usuario}]});
    
    if(duplicados){

        //Compara la contraseña
        console.log(duplicados.comparePasswords(data.password))

        if(duplicados.email === data.email){

            errors.push('El email ya esta registrado');

        }

        if(duplicados.usuario === data.usuario){
         
            errors.push('El nombre de usuario ya esta registrado');
            
        }

        return res.send({error:errors});

    }else{

        await usuario.create(data,(err,user)=>{

            if(err){

                return res.send({error:'Error al intentar insertar al usuario'},422)
    
            }else{
                
                return res.send({data:user},200)
    
            }
    
            
        });

    }

}

module.exports = {

    getUsuarios,
    crearUsuario

};