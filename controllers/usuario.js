const usuario = require('../models/usuario');

//TEST
const getUsuarios = async (req, res) => {

    await usuario.findOne({},(err,docs)=>{
        
        //console.log("creacion---",docs.fechaPedido);
        //console.log("actualizacion---",docs.fechaModificacionPedido);

        res.status(200).send({
            item:docs
        })

    })

}

const getRol = async (req,res) => {

    const idUsuario = JSON.parse(req.params.id);
    const usuarioLogueado = await usuario.findById(idUsuario);
    
    res.status(200).send({rol:usuarioLogueado.tipo})

};

const crearUsuario = async (req,res) => {

    const data = req.body
    let errors = [];

    for (const key in data) {
        
        if(!data[key]){
            
            errors.push('El campo '+key+' no debe estar vacío.');

        }

    }

    if(errors.length > 0){

        return res.status(200).send({error:errors});

    }

    const duplicados = await usuario.findOne({$or:[{email: data.email},{usuario: data.usuario}]});
    
    if(duplicados){

        if(duplicados.email === data.email){

            errors.push('El email ya esta registrado');

        }

        if(duplicados.usuario === data.usuario){
         
            errors.push('El nombre de usuario ya esta registrado');
            
        }

        return res.status(200).send({error:errors});

    }else{

        await usuario.create(data,(err,user)=>{

            if(err){

                return res.status(200).send({error:'Error al intentar insertar al usuario'},422)
    
            }else{
                
                return res.status(200).send({data:user},200)
    
            }
    
            
        });

    }

}

const deshabilitar = async (req, res) => {

    const idUsuario = req.body.id;
    const actualizaHabilitado = await usuario.findByIdAndUpdate(idUsuario,{habilitado: false},{new: true, upsert:true});

    if(actualizaHabilitado.habilitado){

        res.status(200).send({resul:false});

    }else{

        res.status(200).send({resul:true});

    }

    

};

const iniciarSesion = async (req,res) => {

    const data = req.body
    let errors = [];

    for (const key in data) {
        
        if(!data[key]){
            
            errors.push('El campo '+key+' no debe estar vacío.');

        }

    }

    if(errors.length > 0){

        return res.status(200).send({error:errors});

    }

    const checkUsuario = await usuario.findOne({usuario: data.usuario, email: data.email});

    if(checkUsuario === null){

        errors.push('El nombre de usuario y correo indicados no coinciden');

    }

    if(!checkUsuario.habilitado){

        errors.push('El usuario indicado no esta habilitado');

    }

    if(errors.length > 0){

        return res.status(200).send({error:errors});

    }else{

        if(checkUsuario.comparePasswords(data.password)){

            return res.status(200).send({data:checkUsuario},200);
            
        }else{

            errors.push('La contraseña no es correcta.');

            return res.status(200).send({error:errors});

        }

    }

}

module.exports = {

    getUsuarios,
    crearUsuario,
    iniciarSesion,
    getRol,
    deshabilitar

};