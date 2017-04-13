var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var scheduleSchema = new Schema({
  "from": String,
  "to": String,
  "date": Date,
  "user_id":  [{
      type : Schema.ObjectId,
      ref : "schedules"
  }]
});
var Schedule = mongoose.model('Schedule',scheduleSchema);
module.exports = Schedule;
