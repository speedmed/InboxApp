/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var passport = require('passport');


module.exports = {

	showHomePage: function (req, res) {
    
  // If not logged in, show the public view.
    if (!req.session.authenticated) {
      
      return res.view('index');

    }

    // Otherwise, look up the logged-in user and show the logged-in view,
    // bootstrapping basic user data in the HTML sent from the server
    // User.findOne(req.session.me, function (err, user){
    //   if (err) {
    //     return res.negotiate(err);
    //   }

    //   if (!user) {
    //     sails.log.verbose('No user Found !!!');
    //     return res.redirect('/');
    //   }

    //   return res.redirect('/dashboard');
    // });
  },

  dashboard: function(req, res){

          // console.log('', req.isAuthenticated());
          
          return res.view('dashboard', {user: req.session.me});
    
  }
	
};

