var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('users').find(function(err,users){
    res.json(users);
  })
});

router.get('/user', function(req, res){
  var name = req.query.name;
  mongoose.model('users').findOne({ 'name': name },function(err,users){
    //res.json(users);
    res.render('user.twig',{users:users});
  });
});

module.exports = router;
