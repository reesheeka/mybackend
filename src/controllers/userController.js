
const middleware = function( req,res ){
    res.send({msg: "Hi"})
}


const middleware1 = function( req,res ){
    res.send({msg: "Hello"})
}

module.exports.middleware = middleware
module.exports.middleware1 = middleware1


















