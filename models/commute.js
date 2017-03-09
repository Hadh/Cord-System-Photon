var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commuteSchema = new Schema({
    "state": String,
    "cost": Number,
    "Date": Date,
    "user_id": {
      type : Schema.ObjectId,
      ref : "users"
    },
    "parked": Boolean,
    "Rating": Number,
    "comments": String,
});

mongoose.model('commutes', commuteSchema);
