var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var carService = require('../services/car.service');
var commuteService = require('../services/commute.service')
var Commute = mongoose.model('commutes');

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

router.get('/directions',function(req,res,next){

    var origin = {
      lat :36.849731,
      lng: 10.153379
    };
    var destination = {
      lat : 36.836131,
      lng : 10.153218
    };
    var waypoint = {
      lat : 36.843264,
       lng : 10.148932
     };

     commuteService.getDirections(origin,destination,waypoint).asPromise().then(function(response){
       var path = commuteService.routeToGeoJson(response.json);
       var commute = new Commute({
         "state" : "IN_PROGRESS",
         "cost" : 12.0,
         "Date" : new Date().toISOString(),
         "user_id" : "58c075b5f3da202ade63c3e8",
         "car_id" : "58c075b5f3da202ade63c384",
         "Rating" : 0,
         "comments" : "",
         "Path" :{
           "type" : path.type,
           "geometry":{
             "type" : "Line",
             "coordinates" : path.geometry.coordinates
           },
           "properties":{
             "name" : "Path"
           }
         }
       });
       commute.save(function(err){console.error(err);});
       res.json(commute);
     })

});

module.exports = router;
