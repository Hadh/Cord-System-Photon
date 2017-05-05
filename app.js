
var mongoose = require('mongoose');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');
var express = require("express");
var http = require('http');
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
var index = require('./routes/index');
var users = require('./routes/users');
var seeder = require('./routes/seeder');
var cars = require('./routes/cars');
var schedules = require('./routes/schedules');
var sharing = require('./routes/sharing');
var feedbacks = require('./routes/feedbacks');
var plans = require('./routes/plans');


app.use(express.static(__dirname + '/public'));
var commutes = require('./routes/commutes');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


//routes
app.use('/', index);
app.use('/users', users);
app.use('/seeder', seeder);
app.use('/cars', cars);
app.use('/schedules', schedules);
app.use('/commutes', commutes);
app.use('/sharing', sharing);
app.use('/feedbacks', feedbacks);
app.use('/plans', plans);

app.listen(4000, function(){
  console.log('server started on port 4000');

});

var io = require('socket.io').listen(server);
var users = [];
var connections = [];
//socket
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected : %s  sockets conencted', connections.length);

    //disconnect
    socket.on('disconnect',function(data){
        users.splice(users.indexOf(socket.username),1);
        updateUsernames();
        connections.splice(connections.indexOf(socket),1)
        console.log('Disconnected : %s  sockets conencted', connections.length);
    });
    //send msg
    socket.on('send message',function(data){
        console.log(data);
        io.sockets.emit('new message', {msg : data, user: socket.username});
    });

    //new user
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    function updateUsernames(){
        io.sockets.emit('get users', users);
    }
});
