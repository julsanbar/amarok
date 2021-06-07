const express = require('express');
const initDB = require('./config/db');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const port = 8080 || process.env.PORT;

const productoRouters = require('./routes/producto');
const pedidoRouters = require('./routes/pedido');
const proveedorRouters = require('./routes/proveedor');
const usuarioRouters = require('./routes/usuario');

app.use(cors());

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

server.listen(process.env.PORT);

initDB();
