const User = require('../../db/models/user');
const Role = require('../../db/models/role');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id).populate('role').exec( function(err, user) {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        function(username, password, done){
            User.findOne({ name : username.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '')}).populate('role').exec(function(err,user){
                if(err) {
                    return done(err);
                }else {
                    if(user){
                        if (passwordHash.verify(password, user.password)) {
                            done(null, user);
                        }else {
                            done(null, false, { message: 'Incorrect password.', field: 'password' });
                        }
                    }else{
                        done(null, false, { message: 'Incorrect username.', field: 'name' });
                    }
                }
            });
        })
    );

    passport.use('signup', new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        function(username, pass, done){
            let name = username.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            let password = pass.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            User.findOne({ name : name}, function(err,doc){
                if(err) {
                    return done(err);
                }else {
                    if(!doc){
                        if (!name) {
                            done(null, false, { message: 'Required field.', field: 'name' });
                        }
                        else if(!password){
                            done(null, false, { message: 'Required field.', field: 'password' });
                        }
                        else {
                            let user = new User({
                                name: name,
                                isAdmin: false,
                                password: passwordHash.generate(password)
                            });
                            done(null, user);
                        }
                    }else{
                        done(null, false, { message: 'This name is already taken.' });
                    }
                }
            });
        })
    );
};