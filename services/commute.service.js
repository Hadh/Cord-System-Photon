var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCgKfp2bUmw0GVNMUkAYDugo2tj7TQb3r4',
  Promise : global.Promise
});;


function getDirections(o,d,waypoint){

  return googleMapsClient.directions({
      origin: o,
      destination: d,
      mode: 'driving',
      waypoints: waypoint,
      optimize : true,
  },function(res,data){
    return data;
  });
}
module.exports = {
  "getDirections" : getDirections
}
