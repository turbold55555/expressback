const errorHandler = (err, req,res, next) =>{
    console.log(err.stack);
    const error = {...err};
    console.log(err)
    if(error.name === `CastError`){
        error.message ='энэ ID Буруу бүтэцтэй ID байна аа';
        error.statusCode=400;
    }
    if(error.code === 11000){
        error.message ='Энэ талбарын утга давхардсан байна';
        error.statusCode=401;
    }

    res.status(err.statusCode || 500).json({
        success:false,
        error :error
    })
}

module.exports = errorHandler;
