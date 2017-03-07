var express = require('express');
var router  = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');


router.get('/',function(req,res,next){
    fs.readFile('./data/User.json',function(err,users){
      mongoose.model('users').collection.insert(JSON.parse(users));
      res.end();
    });
});
module.exports = router;
