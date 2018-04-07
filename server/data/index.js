const Role = require('../../db/models/role');

module.exports = function(app){
    app.get('/api/getroles', function(req, res) {
        Role.find({}, function(err, docs){

            if(err) res.send(err);

            res.send(docs);
        });
    });
};
