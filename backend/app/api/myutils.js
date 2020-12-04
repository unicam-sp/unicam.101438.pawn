function error(res, status, err){
    console.log('------------ ERROR ------------')
    console.log(err)
    res.status(status).json({
        error: err
    })
}

function message(res, status, message){
    res.status(status).json({ 
        message: message
    })
}

module.exports.error = error
module.exports.message = message