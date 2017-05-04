var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require ('bcryptjs');
var jwt = require('jsonwebtoken');
var auth = require('../routes/auth');

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
    //res.render('user.twig',{users:user});
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


router.post('/register',function(req,res){
    var user = new User({
        name : req.body.name,
        username: req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        adress : req.body.adress,
        type : req.body.type
    });
    user.save(function(err,user){
        if(err){
            res.send(err);
        } else {
            res.send(user);
        }
    });
});

router.post('/login',function(req,res){
    User.findOne({email:req.body.email},function (err,user){
        if(err){
            res.status(500).json({error: err});
        } if(!user){
            res.status(401).json({error: 'User not found'});
        } else {
            if(bcrypt.compareSync(req.body.password, user.password)){
             console.log('User found',user);
             var token = jwt.sign({email:user.email}, 'hdmi',{expiresIn:3600});
                res.status(200).json({success : true, token:token, user : user});
            } else {
                res.status(401).json('Unauthorized');
            }
        }
    });
});
/*registers a user with an invitation from another user */
router.post('/invite/:userid',function(req,res){
    var user = new User({
        name : req.body.name,
        username: req.body.username,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        adress : req.body.adress,
        type : req.body.type,
        invited : req.params.userid
    });
    user.save(function(err,user){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.send(user);
        }
    });

});

/** check if the user has the right for a free ride */
router.get('/checkinvite/:userid',function(req,res){
    var userid = req.params.userid;
    mongoose.model('users').findOne({'invited': userid} ,function(err,user){
        if(user){
            res.json(user);
        } else if(!user){
            res.json({msg:'No Free Rides'});
        } else if(err){
            console.log(err);
        }

    });
});

/** returns number of invited attr of a given id */
router.get('/numberinvite/:userid',function(req,res){
    var userid = req.params.userid;
    var numberInvites = [];
    mongoose.model('users').find({'invited': userid} ,function(err,user){
        if(user){
            console.log(user);
            user.forEach(function(u) {
            numberInvites.push(u.invited);
            });
            console.log(numberInvites.length);
            console.log(numberInvites);
            res.json(numberInvites.length);

        } else if(!user){
            res.json({msg:'No invtatiion: 0 free rides'});
        } else if(err){
            console.log(err);
        }

    });
});

/** removes id from invited - substracts a free ride */
router.get('/substract/:userid',function(req,res){
    var userid = req.params.userid;
    var numberInvites = [];
    mongoose.model('users').find({'invited': userid} ,function(err,user){
        if(user){
            console.log(user);
            // edit obj 1 to delete invited
            mongoose.model('users').findOneAndUpdate({'invited': userid}, {'invited': 0}, {upsert:true}, function(err, doc){
                if (err) return res.send(500, { error: err });
                return res.send("succesfully saved");
            });
        } else if(!user){
            res.json({msg:'No invtatiion: 0 free rides'});
        } else if(err){
            console.log(err);
        }

    });
});

router.get('/profile',auth.authenticate,function(req,res){
        res.json({msg:'Got profile'});
        console.log("Got profile");
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
