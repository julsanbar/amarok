const express = require('express');
const initDB = require('./config/db');

const app = express();
const port = 8080;

const productoRouters = require('./routes/producto');
const pedidoRouters = require('./routes/pedido');

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

app.use(productoRouters);
app.use(pedidoRouters);

app.listen(port, () => {
    
    if(!app){
        console.log("ERROR SERVER",500);
    }else{
        console.log("SERVER ONLINE",200);
    }

});

initDB();