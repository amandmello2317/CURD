const mongoose = require('mongoose')

const MongoURI = "mongodb://127.0.0.1/FullStack";

const ConnectDataBase = async() => {
    try {
       await mongoose.connect(MongoURI)
        console.log("Connected to dataBase");
    } catch (error) {
        console.log("Connection error", error);
    }
}
module.exports = ConnectDataBase;