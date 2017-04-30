var app = require('express')();
var bodyParser = require('body-parser')
var mongoose = require('mongoose');
var controllers = require('./controllers/all');

app.use(bodyParser.json());

mongoose.connect('mongodb://db:' + process.env.DB_PORT + '/app', function(error) {
  if (error) {
    console.log(error);
  } else {
    console.log("Successfully connected to MongoDB");
  }
});

app.get('/', function(request, response) {
  response.send({
    "message": "Hello world from the API"
  });
});

app.post('/user', controllers.user.createUser);

app.listen(process.env.PORT, function() {
  console.log("Application running on http://localhost:3000");
});
