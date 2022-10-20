const express = require('express');
const router = express.Router();
const node = require('nodemon')

//Write a POST /players api that creates a new player ( i.e. that saves a player’s details and doesn’t allow saving the data of a player with a name that already exists in the data)

let players =
   [
       {
           "name": "manish",
           "dob": "1/1/1995",
           "gender": "male",
           "city": "jalandhar",
           "sports": [
               "swimming"
           ]
       },
       {
           "name": "gopal",
           "dob": "1/09/1995",
           "gender": "male",
           "city": "delhi",
           "sports": [
               "soccer"
           ]
       },
       {
           "name": "lokesh",
           "dob": "1/1/1990",
           "gender": "male",
           "city": "mumbai",
           "sports": [
               "soccer"
           ]
       },
   ]
  
   router.post('/players', function (req, res) {
    let ele = req.body.element;
    for(let i = 0; i < players.length; i++){
        if(players[i].name == ele.name){
          return  res.send( { data: "Data already exist" , status: false } ) 
        }
    else{
    players.push(ele)
    return res.send( { data: players , status: true } )
    }
    }
});

module.exports = router;