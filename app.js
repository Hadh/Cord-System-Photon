
var mongoose = require('mongoose');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require("express");
var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'twig');
//Connect to the Database and load all models
mongoose.connect('mongodb://localhost/photon');
fs.readdirSync(__dirname + '/models').forEach(function(model){
  if(~model.indexOf('.js')){
    require(__dirname + '/models/' + model);
    console.info(model +' Loaded!');
  }
});

//require routes
var users = require('./routes/users');
var seeder = require('./routes/seeder');
var cars = require('./routes/cars');
var schedules = require('./routes/schedules');
var sharing = require('./routes/sharing');
app.use(express.static(__dirname + '/public'));
var commutes = require('./routes/commutes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//routes
app.use('/users', users);
app.use('/seeder', seeder);
app.use('/cars', cars);
app.use('/schedules', schedules);
app.use('/commutes', commutes);
app.use('/sharing', sharing);
app.listen(4000, function(){
  console.log('server started on port 4000');

});
