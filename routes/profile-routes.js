var router = require('express').Router();
var passport = require('passport');

var authCheck = (req, res, next) => {
    if(!req.user) {
        // if user is not logged in
        res.redirect('http://localhost:3000/', {user: req.user});
    } else {
        // if logged in
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.send(/*'you are logged in, this is your profile - ' + */ req.user);
})


module.exports = router;