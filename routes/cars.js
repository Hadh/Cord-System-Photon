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
    res.json(data.slice(0,3));
  },function(err){
    console.error(err);
    res.end();
  });

});

// GET request to '/car/info?carId=0e84d44c1-e71b-4c75-837e-e8872b84f15e'
router.get('/car/info', function(req, res){
    var carId = req.query.carId ;
    carService.getCarDetails( carId, function(results){
        res.json({
            carDetails: results //return results to client
        });
    });
});

module.exports = router;
