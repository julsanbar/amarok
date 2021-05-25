const producto = require('../models/producto');
const pedido = require('../models/pedido');

//Devuelve la paginación de los productos
const getPagination = async (req,res) => {

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 6
    
    };
    //{stock:{$lt:6},referencia:500} <--- menor que
    await producto.paginate({stock:{$gt:1}},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });

    
};

//Devuelve la paginación de los productos
const getPaginationCompeticion = async (req,res) => {

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 6
    
    };

    await producto.paginate({categoria: "competicion",stock:{$gt:1}},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });

    
};

//Devuelve la paginación de los productos
const getPaginationFuego = async (req,res) => {

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 6
    
    };

    await producto.paginate({categoria: "fuego",stock:{$gt:1}},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });

    
};

//Devuelve la paginación de los productos
const getPaginationSeguridad = async (req,res) => {

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 6
    
    };

    await producto.paginate({categoria: "seguridad",stock:{$gt:1}},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });

    
};

//Devuelve la paginación de los productos
const getPaginationDefensa = async (req,res) => {

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 6
    
    };

    await producto.paginate({categoria: "defensa",stock:{$gt:1}},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });

    
};


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
    
    res.status(200).send({productos:resultado});

}

//TEST
const insertData = async (req,res) => {

    const data = req.body

    //console.log("ENVIO----------",data);

    /*if(data.categoria === "asdn"){

        console.log("ENVIO----------",data);

    }*/
    
    const unico = await producto.findOne({ referencia: data.referencia}, (err,doc) => {
        
        return (err)? err: doc;
        
    });

    console.log("------------------------------------------");
    console.log(unico);
    console.log("------------------------------------------");

    await producto.create(data,(err,docs)=>{

        if(err){
            //console.log("ERROR---------------",err.message);
            res.status(200).send({error:'ERROR'},422)

        }else{
                        
            res.status(200).send({data:docs})

        }

        
    });

}

module.exports = {

    getPaginationSeguridad,
    getPaginationCompeticion,
    getPaginationFuego,
    getPaginationDefensa,
    getPagination,
    getMasVendidos,
    insertData

};