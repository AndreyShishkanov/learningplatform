const User = require('../db/models/user');
const Role = require('../db/models/role');
const passwordHash = require('password-hash');

module.exports = function(){

    Role.findOne({ name : "Student"}, function(err,role){
        if(err) {
            return done(err);
        }else {
            if(!role){
                let student = new Role({
                    name: 'Student',
                    hasControlAccess: false
                });

                student.save(function(err) {
                    if (err) throw err;

                    console.log('Role saved successfully!');
                });
            }
        }
    });

    Role.findOne({ name : "Teacher"}, function(err,role){
        if(err) {
            return done(err);
        }else {
            if(!role){
                let teacher = new Role({
                    name: 'Teacher',
                    hasControlAccess: true
                });

                teacher.save(function(err) {
                    if (err) throw err;
                    console.log('Role saved successfully!');

                    let admin = new User({
                        name: 'admin',
                        email: 'goodzon91@gmail.com',
                        isAdmin: true,
                        password: passwordHash.generate("123"),
                        role: teacher
                    });
                    admin.save(function(err) {
                        if (err) throw err;

                        console.log('User saved successfully!');
                    });
                });
            }
        }
    });
};
