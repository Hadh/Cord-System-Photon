var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var planSchema = new Schema({
    "name": String,
    "price": Number,
    "features": [String]
});

mongoose.model('plans', planSchema);
