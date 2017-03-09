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
function getCarDetails(carId, callback) {
  mongoose.model('cars').findOne({
        "id": carId
    }, function(err, results) {
        if (err) {
            console.log(err);
        } else {
            callback({
                carId: results.id,
                carname: results.carname,
                energylvl: results.energylvl,
                coords: results.coords
            });
        }
    });
}

module.exports = {
  getGetNearstCars : GetNearstCars,
  getCarDetails : getCarDetails
}
