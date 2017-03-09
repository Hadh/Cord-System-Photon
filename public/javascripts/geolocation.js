// get users current position
var _location= [];
  var options = {
    enableHighAccuracy:true
  };
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(Position){

      _location.push({
        "LAT" : Position.coords.latitude,
        "LNG" : Position.coords.longitude
    });
    console.log(_location);

    },error,options);
  } else {
    $(".map").text("Your browser is out of fashion, there\'s no geolocation!");
  }
