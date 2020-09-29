const express =require('express');
const dotenv =require('dotenv');
dotenv.config({path: './config/config.env'});
const dbConnect = require('./config/config');
const errorHandler = require('./middleware/error');
dbConnect();
const app = express();
//  Route Холбох 
app.use(express.json());

const categoriesRouter = require('./routes/categories');

//  middleware 

app.use('/api/v1/categories', categoriesRouter);
app.use(errorHandler);



app.listen(process.env.PORT, console.log('ажиллаж байна'))  