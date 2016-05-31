var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var dbURI = process.env.MONGO_URI;
var jwt = require('jsonwebtoken');
console.log("dbURI = ", dbURI)
var jwtSecret = "myVotingAppSecret8812351"
mongoose.connect(dbURI);


// define the User model schema
var Schema = mongoose.Schema;
var UserSchema = new Schema({
  login: { type: String, index: { unique: true }}, //unique in the collection
  password: String,
});


UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, callback);
}

UserSchema.pre('save', function(next) {
  var user = this;

  // proceed further only if the password is modified or the user is new
  if (!user.isModified('password')) return next();


  bcrypt.genSalt(function (err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }

      // replace a password string with hash value
      user.password = hash;

      return next();
    });
  });
});

var UserModel = mongoose.model("User", UserSchema);
module.exports = {
    saveUser: function(login,pass,callback) {
      console.log("inside saveUser: login, pass = ", login, pass)
                  var user = new UserModel({login:login, password:pass});
                  user.save(function(err){
                      return callback(err);
              })
      
    },
    
   processLogin: function(login, pass, callback) 
   {
   //  console.log("inside processLogin, login, pass = ", login, pass)
     UserModel.findOne({login:login}, function(err, user){
       if (err) {return callback(err);}
      if (!user) {
        var error = new Error("Incorrect email or password");
        error.name = "IncorrectCredentialsError";
        return callback(error);
      }
       user.comparePassword(pass, function(err, isMatch){
         if (err) return callback(err);
         if (!isMatch)
         {
           var error = new Error("Incorrect email or password")
           error.name = "IncorrectCredentialsError";
           return callback(error)
         }
         var payload = 
         {
           sub: user._id,
         }
         var token = jwt.sign(payload, jwtSecret)
         return callback(null,token,"Login succesfull")
       })
       
     })
   }
}