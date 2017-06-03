var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send([
        { name: "Student", hasControlsAccess: false },
        { name: "Teacher", hasControlsAccess: true }
    ]);
});

module.exports = router;