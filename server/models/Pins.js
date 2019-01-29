// curl -i -X POST -H "Content-Type: application/json" -d '{ "title":"The PIN application","author": "Cristian Marquez","description":"My first PIN", "group": "Javascript", "tags": ["javascript", "code"] }' localhost:3000/api
var mongoose = require('mongoose');

var PinsSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  group: String,
  url: String,
  completed: Boolean,
  tags: [
    {
      type: String
    }
  ],
  updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pins', PinsSchema);
