var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commuteSchema = new Schema({
    "id": String,
    "state": String,
    "cost": Number,
    "Date": Date,
    "user_id": String,
    "parked": Boolean,
    "Rating": Number,
    "comments": String,
});

mongoose.model('commutes', commuteSchema);
