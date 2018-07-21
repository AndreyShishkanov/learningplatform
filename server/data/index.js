const Role = require('../../db/models/role');

module.exports = function(app){
    app.get('/api/getroles', async (req, res) => {
        res.send(await Role.find({}));
    });
};
