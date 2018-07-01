const User = require('../../db/models/user');
const Role = require('../../db/models/role');
const config = require('../config');

module.exports = function(app, passport){

    app.get('/login', (req, res) => {
        res.redirect('/');
    });

    app.post('/api/login', (req, res, next) => {
        passport.authenticate('login',
            (err, user, result) => {
                if (err) throw err;
                if (!user) {
                    res.json({success: false, message: result.message, field: result.field});
                }else{
                    req.logIn(user, err => {
                        if(err){
                            next(err)
                        }else{
                            res.json({success: true, message: null, user: user});
                        }
                    })
                }
            }
        )(req, res, next);
    });

    app.post('/api/signup', (req, res, next) => {
        passport.authenticate('signup',
            (err, user, result) => {
                if (err) throw err;
                if (!user) {
                    res.json({success: false, message: result.message, field: 'name'});
                }else{
                    Role.findOne({ name : "Student"}, function(err,role) {
                        if(err) {
                            return done(err);
                        }else {
                            if(role){

                                user.role = role;

                                user.save(function (err) {
                                    if (err) throw err;

                                    req.logIn(user, err => {
                                        if (err) {
                                            next(err)
                                        } else {
                                            res.json({success: true, message: null, user: user});
                                        }
                                    })
                                });
                            }
                            else{
                                res.json({success: false, message: 'Required field.', field: 'role'});
                            }
                        }
                    });
                }
            }
        )(req, res, next);
    });

    app.post('/api/logout', (req, res) => {
        req.logout();
        res.end();
    });

    app.post('/api/currentUser', (req, res) => {
        res.json(req.user);
    });
};


