const express = require('express');
const router = express.Router();//test-you
//importing a custom module
const xyz = require('../logger/logger.js')
const abc = require('../util/helper.js')
const abc1 = require('../validator/formatter.js')

//importing external package
//const underscore = require('underscore')

router.get('/test-me', function (req, res) {
    //Calling the components of a different custom module
    //console.log("Calling my function ",xyz.myFunction())
    //console.log("The value of the constant is ",xyz.myUrl)

    console.log("calling my function ",xyz.welcome())
    console.log("Calling my function ",abc.printdate())
    console.log("Calling my function ",abc.printmonth())
    console.log("calling my function ",abc.batchinfo())
    console.log("Calling my function ",abc1.printthis())
    console.log("Calling my function ",abc1.printthis1())
    console.log("Calling my function ",abc1.printthis2())

    //Trying to use an external package called underscore
    //let myArray = ['Akash', 'Pritesh', 'Sabiha']
    //let result = underscore.first(myArray)
    //console.log("The result of underscores examples api is : ", result)
    
    res.send('My first ever api!')

    //To be tried what happens if we send multiple response
    //res.send('My second api!')
});

module.exports = router;

//function lodash(){
const lodash = require('lodash');
const month = ['January','February','March','April','May','June','July','August','September','October','November','December']
console.log(lodash.chunk(month, 4))

const oddNum = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
console.log(lodash.tail(oddNum))

const arr = [2, 6, 2, 8, 2]
console.log(lodash.union(arr))

const keyvalue = [
    ["horror", "The Shining"],
    ["drama", "Titanic"],
    ["thriller", "Shutter Island"],
    ["fantasy", "Pans Labyrinth"]
]
console.log(lodash.fromPairs(keyvalue))
//}