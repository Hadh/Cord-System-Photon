var express = require('express');
var router  = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');


router.get('/',function(req,res,next){
    fs.readFile('./data/User.json',function(err,users){
      mongoose.model('users').collection.insert(JSON.parse(users));
      res.end();
    });
    fs.readFile('./data/Car.json',function(err,cars){
      mongoose.model('cars').collection.insert(JSON.parse(cars));
      res.end();
    });
});


router.get('/commutes',function(req,res,next){
    fs.readFile('./data/Commute.json',function(err,commute){
        mongoose.model('commutes').collection.insert(JSON.parse(commute));
        res.end();
    });
});

module.exports = router;
