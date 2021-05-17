const express = require('express');
const initDB = require('./config/db');
const cors = require('cors');

const app = express();
const port = 8080;

const productoRouters = require('./routes/producto');
const pedidoRouters = require('./routes/pedido');
const proveedorRouters = require('./routes/proveedor');
const usuarioRouters = require('./routes/usuario');

app.use(cors({

    origin: 'http://localhost:4200'

}));

app.use(
    express.json({
        limit:'20mb'
    })
);

app.use(
    express.urlencoded({
        limit: '20mb',
        extended: true
    })
);

app.use(express.static('public/invoices'));

app.use(productoRouters);
app.use(pedidoRouters);
app.use(proveedorRouters);
app.use(usuarioRouters);

app.listen(port, () => {
    
    if(!app){
        console.log("ERROR SERVER",500);
    }else{
        console.log("SERVER ONLINE",200);
    }

});

initDB();