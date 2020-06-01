var router = require('express').Router();
var passport = require('passport');


// auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']  
}));


// auth with logout
router.get('/logout', (req, res) => {
   // handle with passport
    req.logout();
    //res.redirect('http://localhost:3000/');
});

// callback route for google to redirect to
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
   	//res.send('you are logged in, this is your profile - ' + req.user.userName);
	console.log(req.user)
    res.redirect('http://localhost:3000/');
    //res.redirect('/profile/');
});

router.get('/current-user', (req, res) => {
	console.log(req.user);
    res.send(req.user);
});

module.exports = router;
