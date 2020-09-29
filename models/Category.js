const mongoose = require('mongoose');
const { transliterate , slugify }  = require("transliteration"); 
const categorySchema = new mongoose.Schema({
    name :{
        type:String,
        required:[true,'Категорын нэрийг оруулна уу'],
        unique:true,
        trim:true,
        maxlength:[50, 'категорын нэрны урт дээд тал нь 50 тэмдэгт байх ёстой ']
    },
    slug:String,
    description :{
        type:String,
        required:[true, ' Категорын тайлбарыг заавал оруулна уу '],
        maxlength:[100, 'Категорын тайлбарын урт хамгийн ихдээ 100 тэмдэгт байх ёстой'],
    },
    photo:{
        type:String,
        default:'no-photo,jpg'
    },
    averageRating:{
        type:Number,
        min:[1, 'Rating хамгийн багадаа 1 байх ёстой '],
        max:[10, 'Rating хамгийн ихдээ  10 байх ёстой'],
    },
    averagePrice:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

categorySchema.pre('save', function(next) {
    console.log('pree ....');
    //  name хөрвүүлэх ажил хийнэ 
    // console.log(this.name);
    this.slug = slugify(this.name);
     this.averageRating =Math.floor(Math.random()*10) +1;
     this.averagePrice =Math.floor(Math.random()*100000) +3000;
    //  slugify(this.name);
    next();
  });

module.exports = mongoose.model('Category', categorySchema);