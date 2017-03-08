var app = require('express')();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');

//require routes
var users = require('./routes/users');
var seeder = require('./routes/seeder');
var cars = require('./routes/cars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Connect to the Database and load all models
mongoose.connect('mongodb://localhost/photon');
fs.readdirSync(__dirname + '/models').forEach(function(model){
  if(~model.indexOf('.js')) require(__dirname + '/models/' + model)
})

//routes
app.use('/users', users);
app.use('/seeder', seeder);
app.use('/cars', cars);

app.listen(8888, function(){
  console.log('server started on port 8888');
})
