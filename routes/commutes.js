var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



router.get('/',function(req,res,next){
    mongoose.model('commutes').find(function(err,commutes){
        res.json(commutes);
    })
});


module.exports = router;
