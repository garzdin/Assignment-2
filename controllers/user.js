var mongoose = require('mongoose');
var User = require('../models/user');

var createUser = function(request, response) {
  if (!request.body.email || !request.body.password) {
    response.send({
      "message": "Provide an email and a password"
    });
  } else {
    User.create({
      email: request.body.email,
      password: request.body.password
    }, function(error, user) {
      if (error) {
        response.send({
          "message": "Encountered an error when crearting user"
        });
      } else {
        response.send({
          "message": "User created successfully"
        });
      }
    });
  }
};

module.exports = {
  createUser: createUser
}
