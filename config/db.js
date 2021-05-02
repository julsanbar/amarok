const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/amarok';

module.exports = () => {

    const connect = () => {

        mongoose.connect(
            DB_URI,
            {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true
            },
            (err)=>{

                if(err){
                    console.log('DB: ERROR',err);
                }else{
                    console.log("CONEXION CORRECTA");
                }

            }
        );

    };

    connect();

};