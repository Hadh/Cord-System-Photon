var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var carSchema = new Schema({
  "name" : String,
  "position" :{
    "type" : {
      type : String,
      default: "Point"
    },
    "coordinates": [Number]
  },
  "energylvl" : Number,
  "available" : {
    type : Boolean,
    default: true
  },
  "commute_id" : {
    type: Schema.ObjectId,
    ref : "commutes"
  },
  "parked" : {
    type : Boolean,
    default: true
  },
  // parking_spot_id int
  "isdeleted" : {
    type : Boolean,
    default : false
  }
});
mongoose.model('cars',carSchema);
