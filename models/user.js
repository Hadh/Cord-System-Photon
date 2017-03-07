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
  // "schedule": [
  //   {
  //     "date": "2017-05-31T18:39:10.733Z"
  //   },
  //   {
  //     "date": "2017-07-22T22:17:12.147Z"
  //   }
  // ]
});
mongoose.model('users',userSchema);
