
const myMiddleware = function(req, res, next){
    
    let { isfreeappuser } = req.headers

    if(!isfreeappuser) {
        res.send({msg: "request is missing a mandatory header"})
    } 
    next()
}

module.exports.myMiddleware = myMiddleware

