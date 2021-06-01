const proveedor = require('../models/proveedor');

//TEST
/*exports.getProveedores = (req, res) => {

    pedido.findOne({},(err,docs)=>{
        
        //console.log("creacion---",docs.fechaPedido);
        //console.log("actualizacion---",docs.fechaModificacionPedido);

        res.send({
            item:docs
        })

    })

}

//TEST
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

}*/

//Devuelve la paginación de los productos
const getPaginationProveedores = async (req,res) => {

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 10
    
    };
    //{stock:{$lt:6},referencia:500} <--- menor que
    await proveedor.paginate({},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });

    
};

const getProveedoresHabilitados = async (req,res) => {

    await proveedor.find({habilitado:true},(err,prov) => {
        //console.log(prov)
        if(!err){

            res.status(200).send({proveedores:prov})

        }

    });

};

const proveedoresReferencia = async (req,res) => {

    const referenciasProveedores = req.body;

    //console.log(referenciasProveedores)

    await proveedor.find({referencia:{$in:referenciasProveedores}},(err,docs) => {

        if(!err){

            res.status(200).send({pro:docs});

        }

    });


};

const modificaProveedor = async (req,res) => {

    let nuevoPerfil = req.body;
    let errors = [];

    const duplicados = await proveedor.findOne({email: nuevoPerfil.email});

    if(duplicados){

        if(duplicados.email === nuevoPerfil.email){

            errors.push('El email ya esta registrado');

        }

        return res.status(200).send({error:errors});

    }else{

        const actualizaPerfil = await proveedor.findByIdAndUpdate(nuevoPerfil._id,nuevoPerfil,{new: true, upsert:true});

        res.status(200).send({resul:actualizaPerfil});


    }

};

const crearProveedor = async (req,res) => {

    let nuevoProveedor = req.body;
    let errors = [];

    const duplicados = await proveedor.findOne({email: nuevoProveedor.email});

    if(duplicados){

        if(duplicados.email === nuevoProveedor.email){

            errors.push('El email ya esta registrado');

        }

        return res.status(200).send({error:errors});

    }else{

        const ultimaReferencia = await proveedor.find({}).sort({$natural:-1}).limit(1);
        const digito = Number.parseInt(ultimaReferencia[0].referencia.slice(2))+1;
        const nuevaReferencia = "PR"+digito;

        //console.log(nuevoProveedor)

        nuevoProveedor.referencia = nuevaReferencia;

        //console.log(nuevoProveedor)

        await proveedor.create(nuevoProveedor,(err,ped)=>{

            //console.log('------')
            //console.log(ped)

            if(err){

                return res.status(200).send({error:'Error al intentar crear el proveedor'})

            }else{

                return res.status(200).send({data:ped})

            }
            
        });


    }

};

module.exports = {

    getPaginationProveedores,
    modificaProveedor,
    crearProveedor,
    proveedoresReferencia,
    getProveedoresHabilitados

};