var mongoose = require('mongoose');
var User = require('../models/user');

var createUser = function(request, response) {
  if (!request.body.username || !request.body.password) {
    response.send({
      "message": "Provide a username and a password"
    });
  } else {
    User.create({
      username: request.body.username,
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
