const fs =require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const Category =  require('./models/Category');
const { json } = require('express');

mongoose.connect(process.env.MONGODB_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true,
});

const categories = JSON.parse(fs.readFileSync(__dirname + '/data/categories.json',"utf-8"));
const importData = async ()=>{
    try{
        await Category.create(categories);
        console.log('амжилттай импорт хийлээ' .green.inverse);
    }catch(err){
        console.log(err.red.inverse);
    }
}
const deleteData = async () => {
    try{
        await Category.deleteMany();
        console.log('Өгөгдлийг устгалаа хийлээ'.red.inverse)
    }
    catch(err){
        console.log(err.red.inverse);
    }
}
if(process.argv[2] == '-i'){
        importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}