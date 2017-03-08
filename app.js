var app = require('express')();
var mongoose = require('mongoose');
var fs = require('fs');
var bodyParser = require('body-parser');

//require routes
var users = require('./routes/users');
var seeder = require('./routes/seeder');
var commutes = require('./routes/commutes');
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
app.use('/commutes', commutes);
app.listen(3000, function(){
  console.log('server started on port 3000');
})
