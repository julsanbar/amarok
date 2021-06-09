const mongoose = require('mongoose');

const DB_URI = "mongodb+srv://usuario:usuario@cluster0.py60o.mongodb.net/amarok?retryWrites=true&w=majority";

//const DB_URI = 'mongodb://localhost:27017/amarok';

/**
 * 
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://usuario:<password>@cluster0.py60o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

 * 
 * 
 */

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