var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


function findById(id, fn) {
  User.findOne({id: id}).exec(function (err, user) {
    if (err) {
      return fn(err, null);
    } 
    if(!user){
      return fn(null, null);
    }
    
      return fn(null, user);
    
  });
}

function findBygoogleId(id, fn) {
  User.findOne({
    googleId: id
  }).exec(function (err, user) {
    if (err) {
      return fn(err, null);
    }
    if(!user){
      return fn(null, null);
    }  
      return fn(null, user);
    
  });
}

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: "YOUR-CLIENT-ID",
    clientSecret: "YOUR-CLIENT-SECRET",
    callbackURL: "http://localhost:1337/oauth2callback",
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {

    // sails.log.debug("checkpoint.... !!!!!")
  	// sails.log.debug('auth profile', profile);

    findBygoogleId(profile.id, function (err, user) {

      if(err){
        
        return done(err);
      }
      // Create a new User if it doesn't exist yet
      if (!user) {

        User.create({

          googleId: profile.id

          // You can also add any other data you are getting back from Facebook here 
          // as long as it is in your model

        }).exec(function createCB (err, user) {
          if (user) {
            req.session.me = profile.displayName;
            req.session.fbAccessToken = accessToken;
            return done(null, user, {
              message: 'Logged In Successfully'
            });
          } else {

            return done(err, null, {
              message: 'There was an error logging you in with Facebook'
            });
          }
        });

      // If there is already a user, return it
      } else {
        req.session.me = profile.displayName;
        req.session.fbAccessToken = accessToken;
        return done(null, user, {
          message: 'Logged In Successfully'
        });
      }
    });
  }
));