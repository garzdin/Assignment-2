var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

var salt = process.env.CRYPTO_SALT;
var iterations = parseInt(process.env.CRYPTO_ITER);

var Schema = new Schema({
  email:  {
    type: String,
    required: true,
    index: {
      unique: true
    },
    match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  },
  password: {
    type: String,
    required: true
  },
  registered_on: {
    type: Date,
    default: Date.now
  }
});

Schema.pre('save', function(next) {
  if (!this.isModified('password')) return next();
  crypto.pbkdf2(this.password, salt, iterations, 512, 'sha512', function(error, hash) {
    if (error) return next(error);
    this.password = hash;
    next();
  });
});

Schema.methods.comparePassword = function(candidatePassword, callback) {
  crypto.pbkdf2(candidatePassword, salt, iterations, 512, 'sha512', function(error, hash) {
    if (error) return callback(error);
    callback(null, hash == this.password);
  });
};

module.exports = {
  schema: Schema,
  model: mongoose.model('User', Schema)
};
