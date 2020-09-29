const Category =require('../models/Category');
const MyError = require('../utils/myError');
// const asyncHandler = require('../middleware/asyncHandler');
const asyncHandler = require('express-async-handler');
const { query } = require('express');

// Бүх категори авна
exports.getCategories =  asyncHandler (async (req,res, next)=>{
    const select = req.query.select; 
    const sort = req.query.sort;
    delete req.query.select
    delete req.query.sort
    console.log(req.query,sort ,select);
        const category =  await Category.find(req.query,select).sort(sort)
        res.status(200).send({
            success: true,
            data: category
        });
   
    
    // console.log(req.body);

});
//  Зөвхөн 1 категори авна

exports.getCategory = asyncHandler( async  (req,res, next)=>{

        const category =  await Category.findById(req.params.id);
        if(!category){
            throw new MyError(req.params.id + `-тай категори байхгүй байна да sd`, 400);
        }
        res.status(200).send({
            success: true,
            data: category
        });
        
 
});
// категори үүсгэх 

exports.createCategory = asyncHandler( async (req,res, next)=>{

        const category =  await Category.create(req.body);
        res.status(200).json({
            success: true,
            data: category
        });
        console.log(category);

});
// категори устгах

exports.deleteCategory = asyncHandler (async (req,res, next)=>{

        const category =  await Category.findByIdAndRemove(req.params.id);
        if(!category){
            throw new MyError(req.params.id + `-тай категори байхгүй байна аааа`, 400);

        }
        res.status(200).send({
            success: true,
            data: category
        });

});
//  категори өөрчлөх

exports.updateCategory =  asyncHandler (async (req,res, next)=>{
 
        const category =  await Category.findByIdAndUpdate(req.params.id, req.body,{
            new:true,
            runValidators:true
        });
        if(!category){
            return res.status(400).send({
                success: false,
                data: ` ${req.params.id} -тай категори байхгүй байна`
            });
        }
        res.status(200).send({
            success: true,
            data: category
        });
   
});