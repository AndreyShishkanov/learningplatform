const Role = require('../../db/models/role')

module.exports = function(app){
    app.get('/getroles', function(req, res, next) {
        Role.find({}, function(err, docs){

            if(err) res.send(err);

            res.send(docs);
        });
    });
};
