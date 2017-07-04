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
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
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
                            done(null, false, { message: 'Incorrect password.' });
                        }
                    }else{
                        done(null, false, { message: 'Incorrect username.' });
                    }
                }
            });
        }));
};