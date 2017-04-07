var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var scheduleSchema = new Schema({
  "from": String,
  "to": String,
  "date": Date,
  "user_id": String
});
var Schedule = mongoose.model('Schedule',scheduleSchema);
module.exports = Schedule;
