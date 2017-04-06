var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var commutes = mongoose.model('commutes');


router.get('/',function(req,res,next){
    mongoose.model('commutes').find(function(err,commutes){
        res.json(commutes);
    });
});
router.get('/:id', function(req, res, next) {
    commutes.findById(req.params.id, function (err, commutes) {
        // Handle any possible database errors
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(commutes);
        }

    });
});
router.post('/order',function(req,res,next){
  
});
module.exports = router;
