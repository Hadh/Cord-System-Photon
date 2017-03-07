var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  mongoose.model('users').find(function(err,users){
    res.json(users);
  })
});

module.exports = router;
