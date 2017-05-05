var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Feedback = require('../models/feedback');

/* GET Feedbacks listing. */
router.get('/', function(req, res, next) {
  mongoose.model('feedbacks').find(function(err,feedbacks){
    res.json(feedbacks);
  })
});



router.post('/:userid',function (req,res) {
    var userid = req.params.userid;
    var text = req.body.text;
    var category = req.body.category;
    var date = req.body.date;

    var returneduser={};
    mongoose.model('users').findOne({ '_id': userid },function(err,user){
      res.json(user);
      returneduser = user;
      console.log("retrned user",returneduser);
      var newfeed = new Feedback ({
          text: text,
          category: category,
          date: date,
          user_id: userid
      });
      newfeed.save(function(err,resp){
          if(err){
              console.log(err);
          } else {
              console.log("Feedback Added");
          }
      });
    });
});


/*GETs a feedback based on id*/
router.get('/:id', function(req, res){
  var feedid = req.params.id;
  mongoose.model('feedbacks').findOne({ '_id': feedid },function(err,feedback){
    res.json(feedback);
  });
});


router.get('/user/:id', function(req, res){
  var user_id = req.params.id;
  mongoose.model('feedbacks').find({ 'user_id': user_id },function(err,feedback){
    res.json(feedback);
  });
});


module.exports = router;
