var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schedule = require('../models/schedule');
var auth = require('../routes/auth');

/* GET all schedules listing. */
router.get('/', function(req, res, next) {
  mongoose.model('Schedule').find(function(err,schedules){
    res.json(schedules);
  })
});

/*Deleteing a schedule */
router.delete('/:id',function(req,res){
    mongoose.model('Schedule').findOneAndRemove({'_id': req.params.id},function(err,msg){
        if(err){
            console.log(err);
        } else{
        console.log("Schedule deleted");
        res.status(200).send();
        }
    });
});

/*GETs a schedule based on id to be used for update*/
router.get('/schedule/:id', function(req, res){
  var scheduleid = req.params.id;
  mongoose.model('Schedule').findOne({ '_id': scheduleid },function(err,schedule){
    res.json(schedule);
  });
});

/*Updates a schdule*/
router.put('/schedule/:id',function(req,res){
    var id = req.params.id;
    var from = req.body.from;
    var to = req.body.to;
    var date = req.body.date;
    mongoose.model('Schedule').findOneAndUpdate({'_id': id},{$set :{'from':from, 'to':to ,'date':date }},{new: true},function(err,schedule){
        if(err){
            console.log(err);
        }else {
            console.log("Schedule Updated");
            res.status(200).send();
        }
    });
});

/*GETs a schedule based on user id*/
router.get('/user/:id',auth.authenticate, function(req, res){
  var user_id = req.params.id;
  mongoose.model('Schedule').find({ 'user_id': user_id },function(err,schedule){
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
      newschedule.save(function(err,res){
          if(err){
              console.log(err);
          } else {
              console.log("Schedule created");
          }
      });
    });
});

module.exports = router;
