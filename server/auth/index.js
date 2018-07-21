const User = require('../../db/models/user');
const Role = require('../../db/models/role');

module.exports = function(app, passport){

    app.get('/login', (req, res) => {
        res.redirect('/');
    });

    app.post('/api/login', (req, res, next) => {
        passport.authenticate('login',
            (err, user, result) => {
                if (err) throw err;
                if (!user) {
                    returnError(res, 401, result.field, result.message);
                }else{
                    req.logIn(user, err => {
                        if(err){
                            next(err)
                        }else{
                            res.json(user);
                        }
                    })
                }
            }
        )(req, res, next);
    });

    app.post('/api/signup', async (req, res, next) => {
        passport.authenticate('signup',
            async (err, user, result) => {
                if (err) throw err;
                if (!user) {
                    returnError(res, 400, 'name', result.message);
                }else{
                    try{
                        const role = await Role.findOne({ name : "Student"});
                        if (role){
                            user.role = role;
                            user.save(function (err) {
                                if (err) throw err;
            
                                req.logIn((user, err) => {
                                    if (err) {
                                        next(err)
                                    } else {
                                        res.json(user);
                                    }
                                })
                            });
                        }
                        else{
                            returnError(res, 400, 'role', 'Required field.');
                        }
                    }
                    catch (err) {
                        return done(err);
                    }
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
    
    function returnError(res, status, field, message) {
        res.status(status);
        res.json({message: message, field: field});
    }
};


