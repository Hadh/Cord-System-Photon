var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schedule = require('../models/schedule');



/* GET all schedules listing. */
router.get('/', function(req, res, next) {
  mongoose.model('schedules').find(function(err,schedules){
    res.json(schedules);
  })
});

/*GETs a schedule based on id*/
router.get('/schedule/:id', function(req, res){
  var scheduleid = req.params.id;
  mongoose.model('schedules').findOne({ '_id': scheduleid },function(err,schedule){
    res.json(schedule);
  });
});

/* POSTS a schedule for a specific user*/
router.post('/user/:id/schedule',function (req,res) {
    var userid = req.params.id;
    var to = req.query.to;
    var from = req.query.from;
    var date = req.query.date;

    var returneduser={};
    mongoose.model('users').findOne({ '_id': userid },function(err,user){
      res.json(user);
      returneduser = user;
      console.log("retrned user",returneduser);
      var newschedule = new Schedule ({
          from: from,
          to: to,
          date: date,
          user_id: userid
      });
      newschedule.save(function(err,resp){
          if(err){
              console.log(err);
          } else {
              console.log("Schedule created");
          }

      });
    });

});

module.exports = router;
