var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  "name": String,
  "username": String,
  "email": String,
  "created_at": Date,
  "password": String,
  "adress": String,
  "type": String,
  "plan_id": Number,
  "isdeleted": Boolean,
    "commute_id":Schema.ObjectId,
    "shared":Boolean,
  // "schedule": [
  //   {
  //     "date": "2017-05-31T18:39:10.733Z"
  //   },
  //   {
  //     "date": "2017-07-22T22:17:12.147Z"
  //   }
  // ]
});
var User = mongoose.model('users',userSchema);
module.exports = User;
