var jwt = require('jwt-simple');
var User = require('../models/user');

var register = function(request, response) {
  if (!request.body.email || !request.body.password) {
    return response.json({
      "message": "Provide an email and a password"
    });
  }
  User.model.create({
    email: request.body.email,
    password: request.body.password
  }, function(error, user) {
    if (error) return response.json({"message": error});
    return response.json({
      "message": "User created successfully"
    });
  });
};

var login = function(request, response) {
  if (!request.body.email || !request.body.password) {
    return response.json({"message": "Provide an email and a password"})
  };
  User.model.findOne({ email: request.body.email }, function(error, user) {
    if (!user) return response.json({"message": "User not found"});
    if (error) return response.json({"message": error});
    user.comparePassword(request.body.password, function(error, match) {
      if (error) return response.json({"message": error});
      return response.json({"token": jwt.encode({user: user._id}, process.env.JWT_SECRET)});
    });
  });
};

var middleware = function(request, response, next) {
  var token = request.body.token || request.get('Token') || request.query.token;
  if (token) {
    if (jwt.decode(token, config.jwt_secret)) {
      request.user = jwt.decode(token, config.jwt_secret).user
      next()
    } else {
      return response.json({"message": "Invalid token provided"});
    };
  } else {
    return response.json({"message": "No token provided"});
  };
};

module.exports = {
  register: register,
  login: login,
  middleware: middleware
}
