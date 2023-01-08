require("dotenv").config();
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDb = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) => {
        console.log(`Mongodb server connected with server:${data.connection.host}`)
    }).catch((err) => {
        console.log(err)
    })

    /*  try {
 
         await mongoose.connect(process.env.MONGO_URI, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
             userCreateIndex: true
         })
 
         console.log("Mongodb connection successful")
 
     } catch (error) {
         console.error("Mongodb connection failed");
         process.exit(1)
     } */
}

module.exports = connectDb;