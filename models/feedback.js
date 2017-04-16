var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var feedbackSchema = new Schema({
  "text": String,
  "category": String,
  "date": Date,
  "user_id":  [{
      type : Schema.ObjectId,
      ref : "User"
  }]
});
var feedbacks = mongoose.model('feedbacks',feedbackSchema);
module.exports = feedbacks;
