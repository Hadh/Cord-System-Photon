var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var stripe = require('stripe');

var Plan = mongoose.model('plans');



router.get('/',function(req, res){
  Plan.find({},function(err,data){
    if(err){
      res.status(500).json({
        message : "Oups! Something went wrong"
      });
    }else{
      res.json(data);
    }
  })
});

router.post('/plans/pay', function(req, res){
  var plan_id = req.query.plan;
  var selected_plan = {}
  Plan.find({"_id" : plan_id}, function(err,plan){
    if(err){
      res.status(500).end();
    }else{
      selected_plan = plan;
    }
  });

})


module.exports = router;
