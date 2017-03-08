var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commuteSchema = new Schema({
  "user": {
    type: Schema.ObjectId,
    ref : "users"
  },
  "car" : {
    type : Schema.ObjectId,
    ref : "cars"
  },
  "state" : String,
  "cost" : Number,
  "path" : {
    "type" : {
      type : String,
      default: "Feature"
    },
    "geometry" : {
      "type" : {
        type : String,
        default : "Line"
      },
      "coordinates" : [Number]
    }
  },
  "date" : Date,
  "rating" :  Number,
  "comments" : [String]
});

mongoose.model('commutes', commuteSchema);
