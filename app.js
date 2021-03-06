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
  response.json({
    "message": "Hello world from the API"
  });
});

app.post('/user', controllers.authentication.register);
app.post('/auth', controllers.authentication.login);

app.use(controllers.authentication.middleware);

app.get('/user', controllers.authentication.info);

app.post('/city', controllers.city.create);
app.get('/city', controllers.city.all);
app.get('/city/:id', controllers.city.one)
app.get('/city/:id/weather', controllers.city.weather);

app.listen(process.env.PORT, function() {
  console.log("Application running on http://localhost:3000");
});
