const User = require('../../db/models/user');
const Role = require('../../db/models/role');
const config = require('../config');
const jwt = require('jsonwebtoken');
const passwordHash = require('password-hash');
const path = require('path');

module.exports = function(app){
    app.get('/login', function(req, res) {
        res.sendFile(path.resolve('app/index.html'));
    });
    app.post('/login', function(req, res) {
        User.findOne({ name: req.body.name.toLowerCase().replace(/^\s\s*/, '').replace(/\s\s*$/, '') }).populate('role').exec(function(err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
                // check if password matches
                if (!passwordHash.verify(req.body.password, user.password)) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {
                    // if user is found and password is right
                    // create a token
                    const token = jwt.sign({user_token: user._id}, config.secret, { expiresIn: '24h' });
                    // return the information including token as JSON
                    res.json({
                        success: true,
                        token: token,
                        role: user.role[0]
                    });
                }
            }
        });
    });
    // app.use(function(req, res, next) {
    //     // check header or url parameters or post parameters for token
    //     const token = req.body.token || req.query.token || req.headers['x-access-token'];
    //     // decode token
    //     if (token) {
    //             // verifies secret and checks exp
    //         jwt.verify(token, config.secret, function(err, decoded) {
    //             if (err) {
    //                 return res.json({ success: false, message: 'Failed to authenticate token.' });
    //             } else {
    //                     // if everything is good, save to request for use in other routes
    //                 req.decoded = decoded;
    //                 next();
    //             }
    //         });
    //     } else {
    //         // if there is no token
    //         // return an error
    //         return res.status(403).send({
    //             success: false,
    //             message: 'No token provided.'
    //         });
    //     }
    // });
};


