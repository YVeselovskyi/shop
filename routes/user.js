const router = require('express').Router();
const User = require('../models/user');
const passport = require('passport');
const passportConfig = require('../config/passport');


router.get('/login' , (req, res) => {
    if(req.user) return res.redirect('/');
    res.render('accounts/login' , {message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/profile' , (req, res) => {
    User.findOne({_id: req.user._id} , (err, user) => {
        if (err) return next(err);
        res.render('accounts/profile', {user: user});
    });
});

router.get('/signup', (req, res, next) => {
    res.render('accounts/signup', {
    	errors: req.flash('errors')
    });
});



router.post('/signup', (req, res) => {
    let user = new User();


    user.profile.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({ email: req.body.email }, (err, existingUser) => {

        if (existingUser) {
            req.flash('errors' , 'Account with this e-mail already exists!')
            return res.redirect('/signup');
        } else {
            user.save((err, user) => {
                if (err) return next(err);

                return res.redirect('/');
            });
        };
    });
});

module.exports = router;
