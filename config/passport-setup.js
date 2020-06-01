var passport = require("passport");

var GoogleStrategy = require("passport-google-oauth20").Strategy;
var keys = require('./keys');
// user model
var User = require('../model/user');

passport.serializeUser((user, done) => {
    console.log('serializing user');
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        console.log('deserializing user');
        done(null, user);
    });
});


passport.use(
 new GoogleStrategy({
   clientID: keys.google.clientID,
   clientSecret: keys.google.clientSecret,
   callbackURL: 'http://localhost:5000/auth/google/callback',
   passReqToCallback: true
  }, function(request, accessToken, refreshToken, profile, done) {
     // check if user already exists in our db
     User.findOne({googleId: profile.id}).then((currentUser) => {
         if(currentUser) {
             // already have the user
             console.log('user is: ', currentUser);
             done(null, currentUser);
         } else {
             // if not, create user in our db
             new User({
                 userName: profile.displayName,
                 googleId: profile.id,
                 userEmail: profile.emails[0].value
          }).save().then((newUser) => {
                 console.log('new user created: ' + newUser);
                 done(null, newUser);
              });
         }
     })
    }
));
