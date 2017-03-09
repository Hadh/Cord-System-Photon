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
    "car_id":{
      type: Schema.ObjectId,
      ref : "cars"
    },
    "Rating": Number,
    "comments": String,
    "Path": {
        "type": {
          type : String,
          default: "Feature"
        },
        "geometry": {
            "type": {
              type : String,
              default : "Line"
            },
            "coordinates": [[Number]]
        },
        "properties": {
            "name": String
        }
    }
});

mongoose.model('commutes', commuteSchema);
