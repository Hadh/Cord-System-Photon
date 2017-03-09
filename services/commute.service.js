var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyCgKfp2bUmw0GVNMUkAYDugo2tj7TQb3r4',
  Promise : global.Promise
});;

var _ = require('underscore');


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

function routeToGeoJson(route){
  var path ;
  if(_.isArray(route.routes[0].legs)) path = route.routes[0].legs[0]
  else path =  route.routes[0].legs;

  return path;
}


module.exports = {
  "getDirections" : getDirections,
  "routeToGeoJson" : routeToGeoJson
}
