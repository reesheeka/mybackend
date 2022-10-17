const today = new Date()
const date = function(){ 
    const todaydate = today.getDate()
    return todaydate
}
const month = function(){
    const todaymonth = today.getMonth()+1
    return todaymonth
}

const getInfo = {
    batchname : "Lithium",
    week : "W3D5",
    topic : "Today topic is Nodejs Module System"
}

const printbatchinfo = function(){
    //return (`Batch name ${getInfo.batchname} , Current Day ${getInfo.week} , ${getInfo.topic}`)
    return (getInfo.batchname + ", " + getInfo.week + ", " + getInfo.topic)
    
}

module.exports.batchinfo = printbatchinfo
module.exports.printdate = date
module.exports.printmonth = month