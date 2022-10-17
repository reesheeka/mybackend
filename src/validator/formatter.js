const hardcoded = function(){
const name = '     FunctionUp    '
return name.trim()
}

const hardcoded1 = function(){
    const name1 = "FunctionUp"
    return name1.toLowerCase()
}

const hardcoded2 = function(){
    const name2 = "FunctionUp"
    return name2.toUpperCase()
}

module.exports.printthis = hardcoded
module.exports.printthis1 = hardcoded1
module.exports.printthis2 = hardcoded2