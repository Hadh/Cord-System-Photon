var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Commute = mongoose.model('commutes');
var carService = require('../services/car.service');
var io = require('socket.io-client');
var commuteService = require('../services/commute.service')

var socket = io('localhost:5000');

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


router.post('/directions',function(req,res,next){

    var origin = {
      lat :36.849731,
      lng: 10.153379
    };
    var destination = JSON.parse(req.body.destination)
    var waypoint = JSON.parse(req.body.user)
    console.log(destination, waypoint);

     commuteService.getDirections(origin,destination,waypoint).asPromise().then(function(response){
       var commute = new Commute({
         "state" : "IN_PROGRESS",
         "cost" : 12.0,
         "Date" : new Date().toISOString(),
         "user_id" : "58c075b5f3da202ade63c3e8",
         "car_id" : "58c075b5f3da202ade63c384",
         "Rating" : 0,
         "comments" : "",
         "Path" : commuteService.routeToGeoJson(response.json)
       });
       commute.save(function(err){
         if(err) console.error(err);
         socket.emit('newcommute',commute);
         res.json(commute);
       });

     },function(error){
       console.error(error);
     })
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
