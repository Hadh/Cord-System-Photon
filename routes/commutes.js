var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();


/*
*  Request commutes for users
*  @param : Source position , Destination
*  @return : possible commutes.
*  Api URL :Get /Commute?source=Lat,Lng&dest=Lat,Lng
*/

router.get('/',function(req,res,next){
    
});


module.exports = router;
