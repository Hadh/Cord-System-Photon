var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('users').find(function(err,users){
    res.json(users);
  })
});
/*
router.get('/commute/:lng/:alt', function(req, res, next) {
    var user_pos = [req.params.lng,req.params.alt];
    var commutes = [];

    mongoose.model('commutes').find({

        location:
            { $near :
                {
                    $geometry: { type: "Point",  coordinates: [ -73.9667, 40.78 ] },
                    $maxDistance: 5000
                }
            }


    },function(err,users){
        res.json(users);
    })
});
*/
/*GETs a user based on id*/
router.get('/user/:id', function(req, res){
  var userid = req.params.id;
  mongoose.model('users').findOne({ '_id': userid },function(err,user){
    res.json(user);
    res.render('user.twig',{users:user});
  });
});

/*GETs a user based on name*/
router.get('/user', function(req, res){
  var name = req.query.name;
  mongoose.model('users').findOne({ 'name': name },function(err,users){
    res.json(users);
    res.render('user.twig',{users:users});
  });
});

/** GETs a specific user schedule */
router.get('/user/:id/schedule',function(req,res){
    var userid = req.params.id;
    mongoose.model('users').findOne({'_id': userid}, 'schedule' ,function(err,user){
        res.json(user);
    });
});
/* POSTS a schedule for a specific user*/
/*router.post('/user/:id/schedule',function (req,res) {
    var userid = req.params.id;
    var returneduser={};
    mongoose.model('users').findOne({ '_id': userid },function(err,user){
      res.json(user);
      returneduser = user;
      console.log(returneduser);
    });

})*/

module.exports = router;
