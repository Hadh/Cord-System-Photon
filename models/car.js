var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var carSchema = new Schema({
  "carname" : String,
  "coords" :{
    "type" : {
      type : String,
      default: "Feature"
    },
    "geometry": {
      "type" : {
        type: String,
        default : "Point"
      },
      "coordinates": [Number]
    },
    "properties":{
      "name" : String
    }
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
  // "parking_spot_id" :{
  //   type: Schema.ObjectId
  //   ref : "parkings"
  // },
  "isdeleted" : {
    type : Boolean,
    default : false
  }
});

mongoose.model('cars',carSchema);
