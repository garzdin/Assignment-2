var City = require('../models/city');

var create = function(request, response) {
  City.model.create({
    name: request.body.name,
    latitude: request.body.latitude,
    longitude: request.body.longitude
  }, function(error, user) {
    if (error) return response.json({"message": error});
    return response.json({
      "message": "City created successfully"
    });
  });
};

var all = function(request, response) {
  City.model.find(function(error, cities) {
    if (error) return response.json({"message": error});
    return response.json({"cities": cities});
  });
};

var one = function(request, response) {
  City.model.findById(request.params.id, function(error, city) {
    if (error) return response.json({"message": error});
    return response.json({"city": city});
  });
};

var weather = function(request, response) {
  City.model.findById(request.params.id, function(error, city) {
    if (error) return response.json({"message": error});
    city.getWeather(function(error, weather) {
      if (error) return response.json({"message": error});
      return response.json({"weather": weather});
    });
  });
};

module.exports = {
  create: create,
  all: all,
  one: one,
  weather: weather
}
