var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var carService = require('../services/car.service');

router.get('/', function(req, res, next) {
  mongoose.model('cars').find(function(err,cars){
    res.json(cars);
  });
});

router.get('/near',function (req,res,next) {
  var lat = req.query.lat;
  var lng = req.query.lng;
  console.log('lat', lat);
  console.log('lng', lng);
  carService.getGetNearstCars(lng,lat,2000).then(function(data){
    //console.info(data);
    res.json(data);
  },function(err){
    console.error(err);
    res.end();
  });
});

module.exports = router;
