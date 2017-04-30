# Assignment-2
A school project for creating a REST API with authentication and consumption of a 3rd-party web service.

An API, that provides authentication and object management for a weather application.
It uses data from DarkSky.

Endpoints:
  - POST /user (create a user)
    - params:
      - email: String
      - password: String
    - response:
      - message: String
  - POST /auth (login a user)
    - params:
      - email: String
      - password: String
    - response:
      - success:
        - token: String
      - error:
        - message: String
  - GET /user (get user info)
    - headers
      - token: String
    - response:
      - email: String
      - registered_on: Date
  - POST /city (create a city)
    - headers
      - token: String
    - params:
      - name: String,
      - latitude: Number
      - longitude: Number
    - response:
      - message
  - GET /city (list cities)
    - headers
      - token: String
    - response:
      - name: String,
      - latitude: Number
      - longitude: Number
  - GET /city/:id (get a city)
    - headers
      - token: String
    - response:
      array:
        - name: String,
        - latitude: Number
        - longitude: Number
  - GET /city/:id/weather (get a city's weather)
    - headers
      - token: String
    - response:
      - object
