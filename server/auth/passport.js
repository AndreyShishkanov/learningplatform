const User = require('../../db/models/user');
const Role = require('../../db/models/role');
const LocalStrategy = require('passport-local').Strategy;
const passwordHash = require('password-hash');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser( async (id, done) => {
        try{
            let user = await User.findById(id).populate('role').exec();
            done(null, user);
        }
        catch(err){
            done(err);
        }
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try{
                const user = await User.findOne({ name : username.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '')}).populate('role').exec();
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
            catch (err) {
                return done(err);
            }
        })
    );

    passport.use('signup', new LocalStrategy({
            usernameField: 'name',
            passwordField: 'password'
        },
        async (username, pass, done) => {
            const name = username.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            const password = pass.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            try{
                const user = await User.findOne({ name : name});
    
                if(!user){
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
            catch (err) {
                return done(err);
            }
        })
    );
};