const usuario = require('../models/usuario');
const bcrypt = require('bcrypt-node');
const pedido = require('../models/pedido');
const emailer = require('../config/email');

const enviaEmail = async (req, res) => {

    console.log(req.body.correo)
    emailer.sendMail(req.body.correo);

    return res.status(200).send({email:'ok'});
};

/**
 *           //[8,15] longitud, no espacios, 1 mayus, 1 minus, 1 especial, 1 num
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%"*?&])([A-Za-z\d$@"$!%*?&]|[^ ]){8,15}$/)
 * 
 */

const password = async (req,res) => {

    //console.log(req.body)
    const datos = req.body;
    let errors = [];

    const duplicados = await usuario.findOne({$and:[{email: datos.email},{usuario: datos.usuario}]});

    //console.log(duplicados)

    if(duplicados === null){

        errors.push('Los datos introducidos son erróneos.');

        return res.status(200).send({error:errors});

    }else{

        const mayus = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        const espec = ['$','@','$','!','%','"','*','?','&'];
        let pass = mayus[parseInt(random(0,mayus.length-1))]+mayus[parseInt(random(0,mayus.length-1))].toLowerCase()+espec[parseInt(random(0,espec.length-1))]+parseInt(random(0,9));

        for (let i = 0; i < parseInt(random(4,12)); i++) {

            pass += (i%2 !== 0)? mayus[parseInt(random(0,mayus.length-1))] : mayus[parseInt(random(0,mayus.length-1))].toLowerCase();

        }

        const user = {

            email: datos.email,
            usuario: datos.usuario,
            password: pass

        }

        //console.log("--->",user)

        emailer.sendPass(user);

        bcrypt.hash(user.password, null, null, async (err, hash) => {
                
            if (!err) {
                
                user.password = hash;

                //console.log("-------")
                //console.log(nuevoPerfil.password)

                const actualizaPerfil = await usuario.findByIdAndUpdate(duplicados._id,user,{new: true, upsert:true});

                res.status(200).send({resul:actualizaPerfil});
            }

        });

    }

};

function random(min, max) {
    return Math.random() * (max - min) + min;
}

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

const pedidosUsuario = async (req,res) => {

    //console.log(req.params.refPedidos.split(','))

    const referenciasPedidos = req.params.refPedidos.split(',');

    await pedido.find({referencia:{$in:referenciasPedidos}},(err,docs) => {
        //console.log(docs)
        res.status(200).send({pedidos:docs})

    });

};

const paginationUsuariosEmpleado = async (req,res) => {
    
    const options = {
        
        page: req.params.page,
        limit: 10
        //sort:{estado:-1}
    
    };
    //{stock:{$lt:6},referencia:500} <--- menor que
    //tipo:{$ne:'administrador'} <---- negacion!!
    await usuario.paginate({tipo:{$not:{$in:['administrador','empleado']}}},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });
    
};

//paginationUsuariosAdmin
const paginationUsuariosAdmin = async (req,res) => {
    //console.log("holiiiiiiiiiii")
    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 10
        //sort:{estado:-1}
    
    };
    //{stock:{$lt:6},referencia:500} <--- menor que
    //tipo:{$ne:'administrador'} <---- negacion!!
    await usuario.paginate({},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });
    
};

const usuarioPedido = async (req, res) => {

    const ped = req.params.ref;

    //console.log("---------",ped)

    await usuario.findOne({pedidos:ped},(err,docs)=>{

        //console.log(docs)

        res.status(200).send({usuario:docs});      

    });

};

const modificaPerfil = async (req,res) => {

    let nuevoPerfil = req.body;
    let errors = [];

    const duplicados = await usuario.findOne({$or:[{email: nuevoPerfil.email},{usuario: nuevoPerfil.usuario}]});

    if(duplicados){

        if(duplicados.email === nuevoPerfil.email){

            errors.push('El email ya esta registrado');

        }

        if(duplicados.usuario === nuevoPerfil.usuario){
         
            errors.push('El nombre de usuario ya esta registrado');
            
        }

        return res.status(200).send({error:errors});

    }else{

        //console.log("-------")
        //console.log(nuevoPerfil.password)

        if(nuevoPerfil.password !== undefined){

            bcrypt.hash(nuevoPerfil.password, null, null, async (err, hash) => {
                
                if (!err) {
                    
                    nuevoPerfil.password = hash;

                    //console.log("-------")
                    //console.log(nuevoPerfil.password)

                    const actualizaPerfil = await usuario.findByIdAndUpdate(nuevoPerfil.id,nuevoPerfil,{new: true, upsert:true});

                    res.status(200).send({resul:actualizaPerfil});
                }

            });

        }else{

            //console.log("-------")
            //console.log(nuevoPerfil)

            const actualizaPerfil = await usuario.findByIdAndUpdate(nuevoPerfil.id,nuevoPerfil,{new: true, upsert:true});

            res.status(200).send({resul:actualizaPerfil});

        }

    }

};

const perfil = async (req,res) => {

    const idUsuario = req.body.id;
    const perfil = await usuario.findById(idUsuario);

    const datos = {

        usuario: perfil.usuario,
        telefono: perfil.telefono,
        nombre: perfil.nombre,
        nacimiento: perfil.nacimiento,
        licencia: perfil.licencia,
        email: perfil.email,
        dni: perfil.dni,
        direccion: perfil.direccion,
        apellidos: perfil.apellidos,
        codigoPostal: perfil.codigoPostal,
        password: perfil.password


    }

    res.status(200).send({datos})

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

                return res.status(200).send({error:'Error al intentar insertar al usuario'})
    
            }else{
                
                return res.status(200).send({data:user})
    
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

    }else{

        if(!checkUsuario.habilitado){

            errors.push('El usuario indicado no esta habilitado');
    
        }

    }

    if(errors.length > 0){

        return res.status(200).send({error:errors});

    }else{

        if(checkUsuario.comparePasswords(data.password)){

            if(checkUsuario.tipo === 'registrado' && checkUsuario.pedidos.length !== 0){

                console.log('Pedidos---',checkUsuario.pedidos)

                const pedidos = await pedido.find({referencia:{$in:checkUsuario.pedidos},estado:'enviado'});

                console.log('Pedidos---',(pedidos.length === 0)?'holi':'adio')

                if(pedidos.length !== 0){
                
                    let mayor = pedidos[0].createdAt;
                    let id = pedidos[0]._id;

                    for (const iterator of pedidos) {
                        
                        if(iterator.createdAt <= mayor){

                            id = iterator._id;

                            console.log("FECH",iterator.referencia)

                        }

                    }

                    await pedido.findByIdAndUpdate(id,{estado: 'entregado'},{new: true, upsert:true});

                }

            }


            return res.status(200).send({data:checkUsuario});
            
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
    deshabilitar,
    perfil,
    modificaPerfil,
    paginationUsuariosAdmin,
    pedidosUsuario,
    paginationUsuariosEmpleado,
    usuarioPedido,
    enviaEmail,
    password

};