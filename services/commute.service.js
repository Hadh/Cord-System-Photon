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
  var coordinates=[];
  console.log('route : ',route)
  if(_.isArray(route.routes[0].legs)) path = route.routes[0].legs[0]
  else path =  route.routes[0].legs;

  //Extracting coordinates
  path.steps.forEach(function(step){
    var tmp = [step.start_location.lat, step.start_location.lng];
    coordinates.push(tmp);
  });
  coordinates.push([path.steps[path.steps.length-1].end_location.lat,path.steps[path.steps.length-1].end_location.lng])

  //Forming GeoJSON

  var final_path = {
    "type": "Feature",
    "properties": {
      "name" : "Path"
    },
    "geometry": {
      "type": "LineString",
      "coordinates": coordinates
    }
  }

  return final_path;
}


module.exports = {
  "getDirections" : getDirections,
  "routeToGeoJson" : routeToGeoJson
}
