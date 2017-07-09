const User = require('../../db/models/user');
const Role = require('../../db/models/role');
const config = require('../config');

module.exports = function(app, passport){

    app.get('/login', (req, res) => {
        res.redirect('/');
    });

    app.post('/login', (req, res, next) => {
        passport.authenticate('local',
            (err, user) => {
                if (err) throw err;
                if (!user) {
                    res.json({success: false, message: 'Authentication failed. User not found.'});
                }else{
                    req.logIn(user, err => {
                        if(err){
                            next(err)
                        }else{
                            res.json({success: true, message: null, user: user});
                        };
                    })
                }
            }
        )(req, res, next);
    });

    app.post('/logout', (req, res) => {
        req.logout();
        res.end();
    });

    app.post('/currentUser', (req, res) => {
            res.json(req.user);
    });
    app.post('/isAuthorizated', (req, res) => {
        res.json(typeof req.user !== 'undefined');
    });
};


