
function errorHandler(err, req,res, next){
    res.status(500).json({message: err.mesage, stack: err.stack});
}

function boomErrorHandler(err, req, res, next){
    if(err.isBoom){
        const {output} = err
        res.status(output.statusCode).json(output.payload)
    }else{
        next(err)
    }
}

export {errorHandler, boomErrorHandler}