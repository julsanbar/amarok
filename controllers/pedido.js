const pedido = require('../models/pedido');

const easyinvoice = require('easyinvoice');
const fs = require('fs');

//DATE yyyy-mm-dd
//^(19|20)\d\d([- .])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$

//TEST
const getPedidos = async (req, res) => {

    await pedido.findOne({},(err,docs)=>{
        
        //console.log("creacion---",docs.fechaPedido);
        //console.log("actualizacion---",docs.fechaModificacionPedido);

        res.send({
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
            res.send({error:'ERROR'},422)

        }else{
            
            res.send({data:docs})

        }

        
    });

}

//TEST FACTURA
const factura = async (req,res) => {

    console.log("Cliente",req.params);

    /*
    await pedido.findOne({},(err,docs)=>{
        
        res.send({
            item:docs
        })

    })
    */

    var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        "currency": "USD",
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "https://www.easyinvoice.cloud/img/logo.png", //or base64
        //"logoExtension": "png", //only when logo is base64
        "sender": {
            "company": "Sample Corp",
            "address": "Sample Street 123",
            "zip": "1234 AB",
            "city": "Sampletown",
            "country": "Samplecountry"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "client": {
            "company": "Client Corp",
            "address": "Clientstreet 456",
            "zip": "4567 CD",
            "city": "Clientcity",
            "country": "Clientcountry"
            //"custom1": "custom value 1",
            //"custom2": "custom value 2",
            //"custom3": "custom value 3"
        },
        "invoiceNumber": "2020.0001",
        "invoiceDate": "05-01-2020",
        "products": [
            {
                "quantity": "2",
                "description": "Test1",
                "tax": 6,
                "price": 33.87
            },
            {
                "quantity": "4",
                "description": "Test2",
                "tax": 21,
                "price": 10.45
            }
        ],
        "bottomNotice": "Kindly pay your invoice within 15 days."
    };
     
    //CREA
    const result = await easyinvoice.createInvoice(data);                       
    await fs.writeFileSync("invoice.pdf", result.pdf, 'base64');

    const read = await fs.readFileSync("invoice.pdf");

    //await easyinvoice.createInvoice(data,async function (result) {
      //      const download = await easyinvoice.download('myInvoice.pdf', result.pdf);
        
        //res.send({"create":download});
    //});
    res.send({data});
    //res.send({"object":easyinvoice, "data":data});

};

module.exports = {
    
    getPedidos,
    insertData,
    factura

};