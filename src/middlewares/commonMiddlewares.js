const mongoose = require('mongoose')
const objectId = mongoose.isValidObjectId
const myMiddleware = function(req, res, next){
    
    let isFreeAppUser  = req.headers.isfreeappuser

    if(!isFreeAppUser) {
       return res.send({msg: "request is missing a mandatory header"})
    } else {
        isFreeAppUser = isFreeAppUser.toLowerCase() === 'true'? true: false
        req.isFreeAppUser = isFreeAppUser
    }
    next()
}

const myMiddleware1 = function(req, res, next){
    let { userId, productId } = req.body

    if(!userId){
        return res.send({ msg: "userId is misssing" })
    }else if(!productId){
        return res.send({ msg: "productId is missing" })
    }

    if(!objectId(userId)){
        return res.send({ msg: "enter valid userId"})
    }else if(!objectId(productId)){
        return res.send({ msg: "enter valid productId"})
    }
    next()
}

module.exports.myMiddleware = myMiddleware
module.exports.myMiddleware1 = myMiddleware1


