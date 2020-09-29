const mongoose = require('mongoose');

const connectDB = async () =>{
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true,
    });
    console.log(`mongo db холбогдлоо: ${conn.connection.host}`);
};
module.exports =connectDB;