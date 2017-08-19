module.exports = function (app, io) {
    let words = [];

    let currentWord = "";

    io.on('connection', function (socket) {
        socket.on('guess', function (time) {
            io.emit('play', time);
        });


    });

    app.get('/getWords', function(req, res) {
            res.json(words);
    });

    app.post('/addWord', function(req, res) {
        words.push(req.body.word);
        io.emit('refreshWords');
        res.end();
    });

    app.post('/deleteWord', function(req, res) {
        words.splice(req.body.index, 1);
        io.emit('refreshWords');
        res.end();
    });
};
