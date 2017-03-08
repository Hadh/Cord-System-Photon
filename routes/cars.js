var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
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
      mongoose.model('cars').find({
        "coords.geometry": {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: [lng,lat]
                },
                $maxDistance: 2000
            }
        }
    },function(err,cars){
      res.json(cars);
      console.log(cars.length);

    });
});

module.exports = router;
