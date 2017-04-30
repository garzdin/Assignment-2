var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var request = require('request');

var apiKey = process.env.DARKSKY_API_KEY;

var Schema = new Schema({
  name:  {
    type: String,
    required: true,
    index: {
      unique: true
    },
    match: /[a-z A-Z]+$/
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  added_on: {
    type: Date,
    default: Date.now
  }
});

Schema.methods.getWeather = function(callback) {
  var url = "https://api.darksky.net/forecast/" + apiKey + "/" + this.latitude + "," + this.longitude;
  request(url, function(error, response, body) {
    if (error) {
      callback(error, null);
    } else {
      callback(null, JSON.parse(body));
    }
  });
};

module.exports = {
  schema: Schema,
  model: mongoose.model('City', Schema)
};
