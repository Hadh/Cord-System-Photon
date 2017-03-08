var mongoose = require('mongoose');


function GetNearstCars(lng,lat,radius){
  var error;
  var cars ;
  return mongoose.model('cars').find({
    "coords.geometry": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng,lat]
        },
        $maxDistance: radius
      }
    }
  });

}


module.exports = {
  getGetNearstCars : GetNearstCars
}
