const pedido = require('../models/pedido');
const producto = require('../models/producto');
const usuario = require('../models/usuario');
var easyinvoice = require('easyinvoice');
const fs = require('fs');

//TEST
const getPedidos = async (req, res) => {

    await pedido.findOne({},(err,docs)=>{
        
        //console.log("creacion---",docs.fechaPedido);
        //console.log("actualizacion---",docs.fechaModificacionPedido);

        res.status(200).send({
            item:docs
        })

    })

}

//TEST
const insertData = async (req,res) => {

    const data = req.body

    //res.send({data})

    await pedido.create(data,(err,docs)=>{

        if(err){
            //console.log(err);
            res.status(200).send({error:'ERROR'},422)

        }else{
            
            res.status(200).send({data:docs})

        }

        
    });

}

const idClientePedido = async (req,res) => {

    const pedido = req.body;
    const cliente = await usuario.findOne({pedidos:pedido.referencia});

    res.status(200).send({id:cliente._id})

};

const crearPedido = async (req,res) => {
    
    const idCliente = req.body.id;
    const nuevosProductos = req.body.pedido.productos;
    let productosPedidos = await producto.find({referencia:{$in:nuevosProductos}});
    const cliente = await usuario.findById(idCliente);
    let licenciaValida = true;
    
    //console.log(cliente.licencia)

    for (const key in productosPedidos) {
                
        //console.log(productosPedidos[key].categoria)

        if((cliente.licencia === 'null') && (productosPedidos[key].categoria !== 'defensa')){

            licenciaValida = false;

        }

        if((cliente.licencia === 'seguridad') && (productosPedidos[key].categoria === 'competicion')){

            licenciaValida = false;

        }


        if((cliente.licencia === 'fuego') && ((productosPedidos[key].categoria === 'seguridad') || (productosPedidos[key].categoria === 'competicion'))){

            licenciaValida = false;

        }

        if((cliente.licencia === 'competicion') && ((productosPedidos[key].categoria === 'seguridad') || (productosPedidos[key].categoria === 'fuego'))){

            licenciaValida = false;

        }


    }

    //console.log(licenciaValida)

    if(licenciaValida === true){

        const ultimaReferencia = await pedido.find({}).sort({$natural:-1}).limit(1);
        const digito = Number.parseInt(ultimaReferencia[0].referencia.slice(1))+1;
        const nuevaReferencia = "P"+digito;
        let cantidad = {};

        const nuevoPedido = {

            referencia:nuevaReferencia,
            estado:'enviado',
            productos:nuevosProductos
    
        };

        await pedido.create(nuevoPedido,async (err,ped)=>{

            if(err){

                return res.status(200).send({error:'Error al intentar insertar al pedido'})

            }else{

                nuevosProductos.forEach(function(i) { cantidad[i] = (cantidad[i]||0) + 1;});

                for (const key in productosPedidos) {
                    
                    productosPedidos[key].stock -= cantidad[productosPedidos[key].referencia];

                    await producto.findByIdAndUpdate(productosPedidos[key]._id,{stock: productosPedidos[key].stock},{new: true, upsert:true});

                }


                const pedidosCliente = await usuario.findById(idCliente);
                pedidosCliente.pedidos.push(nuevoPedido.referencia);

                await usuario.findByIdAndUpdate(idCliente,{pedidos: pedidosCliente.pedidos},{new: true, upsert:true});
                
                return res.status(200).send({data:ped},200)

            }

            
        });
    
    }else{

        return res.status(200).send({error:'No dispone de la licencia necesaria para los productos seleccionados.'})

    }

};

const cancelarPedido = async (req,res) => {
    
    const idPedido = req.body._id;
    const estadoPedido = req.body.estado;

    if(estadoPedido === 'enviado'){

        const cancelado = await pedido.findByIdAndUpdate(idPedido,{estado: 'cancelado'},{new: true, upsert:true});
        let productoDevuelto = {};
    
        cancelado.productos.forEach(function(x) { productoDevuelto[x] = (productoDevuelto[x] || 0)+1; });

        await producto.find({referencia:{$in:[800,200,500]}}, async (err,result) => {

            for (const iterator of result) {
             
                iterator.stock += productoDevuelto[iterator.referencia];

                await producto.findByIdAndUpdate(iterator._id,{stock: iterator.stock},{new: true, upsert:true});                

            }

        });

        res.status(200).send(cancelado);

    }else{

        res.status(200).send({error:'No se puede cancelar un pedido entregado o ya cancelado.'});

    }
 
};

const getPaginationPedidos = async (req,res) => {

    const pedidosUsuario = await usuario.findById(req.params.id);

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 10
    
    };

    await pedido.paginate({referencia:{$in:pedidosUsuario.pedidos}},options,(err,docs)=>{

        res.status(200).send({
            docs
        });
    });

    
};
//paginationPedidosAdmin
const paginationPedidosAdmin = async (req,res) => {

    const options = {
        //empieza por 1
        page: req.params.page,
        limit: 10
    
    };
    //{stock:{$lt:6},referencia:500} <--- menor que
    await pedido.paginate({},options,(err,docs)=>{
        //console.log("asd------",docs.totalDocs);
        res.status(200).send({
            docs
        });
    });
    
};

const getProductosPedidos = async (req,res) => {

    const referenciasProductos = JSON.parse(req.params.refProductos);
    let productoCantidad = {};
    let items = [];

    await producto.find({referencia:{$in:referenciasProductos}},(err,docs) => {
 
        referenciasProductos.forEach(function(x) { productoCantidad[x] = (productoCantidad[x] || 0)+1; });

        for (const key in docs) {

            const productoResultante = {

                referencia: docs[key].referencia,
                categoria: docs[key].categoria,
                nombre: docs[key].nombre,
                precio: docs[key].precio,
                tasa: docs[key].tasa,
                cantidad: productoCantidad[docs[key].referencia]
    
            };

            items.push(productoResultante);

        }

        res.status(200).send({
            productos: items
        })

    });
    
};

const factura = async (req,res) => {

    const idCliente = req.params.idCliente;
    const pedido = JSON.parse(req.params.pedido);
    const title = "Pedido Ref."+pedido.referencia;
    const fecha = pedido.fechaPedido.toString().substring(0,10);
    const fechaFactura = new Date(Date.now()).toISOString().substring(0,10);
    const nombreFactura = "facturaRef"+pedido.referencia;
    const productos = [];
    const productosPedido = await producto.find({referencia:{$in:pedido.productos}});
    const cliente = await usuario.findById(idCliente);
    const marca = (pedido.estado === 'cancelado')? "https://i.imgur.com/PGKU68G.png": "";
    let productoCantidad = {};
    
    pedido.productos.forEach(function(x) { productoCantidad[x] = (productoCantidad[x] || 0)+1; });

    for (const key in productosPedido) {

        const product = {

            "quantity": productoCantidad[productosPedido[key].referencia],
            "description": "<b>Ref. "+productosPedido[key].referencia+"</b>: "+productosPedido[key].nombre,
            "tax": productosPedido[key].tasa,
            "price": productosPedido[key].precio

        };

        productos.push(product);

    }

   
    let data = {
        "documentTitle": title, 
        "currency": "EUR",
        "locale":"es-ES", //Formato numerico tambien podria ser ca-ES
        "taxNotation": "vat", //or gst = POR CONSUMO Y O SERVICIO vat = IVA
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://i.imgur.com/U0n85py.png", //o en base64
        //"logoExtension": "png", //solo cuando el logo esta en base64
        "background": marca,
        "sender": {
            "company": "Armería Amarok S.L.",
            "address": "Calle de Juan de Urbieta, 22, Local",
            "zip": "28007",
            "city": "Madrid",
            "country": "España",
            "custom1": "Email: info@amarok.com",
            "custom2": "Teléfono: (+34)914-332-442",
            "custom3": "Horario: De lunes a Sabados, de 10:00 a 20:00"
        },
        "client": {
            "company": cliente.nombre+" "+cliente.apellidos,
            "address": cliente.dni,
            "zip": cliente.direccion,
            "city": cliente.codigoPostal,
            "country": cliente.email,
            "custom1": "Licencia de "+cliente.licencia
        },
        "invoiceNumber": fechaFactura,
        "invoiceDate": fecha,
        "products": productos,
        "bottomNotice": "En caso de reclamaciones y/o sugerencias sobre la factura expedida, póngase en contacto con nosotros lo antes posible.<br><i>Gracias por confiar en Armería Amarok.</i>",
        "translate": { 
         "invoiceNumber": "Fecha de factura",
         "invoiceDate": "Fecha de pedido",
         "products": "Productos", 
         "quantity": "Cantidad", 
         "price": "Precio<br>Unitario",
         "subtotal": "Subtotal",
         "total": "Total"
        }
    };
     
    const result = await easyinvoice.createInvoice(data);                       
    await fs.writeFileSync("public/invoices/"+nombreFactura+".pdf", result.pdf, 'base64');   
    
    res.status(200).send({ruta:"http://localhost:8080/"+nombreFactura+".pdf"});

};

module.exports = {
    
    getPedidos,
    insertData,
    factura,
    getPaginationPedidos,
    getProductosPedidos,
    cancelarPedido,
    crearPedido,
    paginationPedidosAdmin,
    idClientePedido

};