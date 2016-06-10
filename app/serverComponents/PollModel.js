// define the User model schema
var mongoose = require('mongoose');

var PollSchema = new mongoose.Schema({
  author: String, 
  id: String,
  pollName: String,
  creationDate: Date,
  polls: [mongoose.Schema.Types.Mixed],
});

mongoose.model("Polls", PollSchema);
