const mid1 = function( req,res,next ) {
    const IP = req.ip
    const path = req.path
    const date = new Date()
    const currentdate = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear() + "  " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
   
    console.log(IP, path, currentdate)
    
    next()

}

module.exports.mid1= mid1

