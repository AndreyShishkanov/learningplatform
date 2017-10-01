module.exports = function (app, io) {
    let words = [];
    let students = [];
    let answers = {};

    io.on('connection', function (socket) {
        if(socket.user.role.name == 'Student'){
            students.push(socket.user);
        }
        io.emit('refreshStudents', students);
        io.emit('refreshWords', words);
        io.emit('refreshAnswers', answers);

        // socket.on('answer', function(answer){
        //     answers[socket.user.name] = answer;
        //     io.emit('refreshAnswers', answers);
        // });

        socket.on('nextWord', function(){
            words.find(x=>x.guessed === false).guessed = true;
            answers = {};
            io.emit('refreshAnswers', answers);
            io.emit('refreshWords', words);
        });

        socket.on('disconnect', function(){
            if(socket.user.role.name == 'Student') {
                students.splice(students.indexOf(socket.user), 1);
            }
            io.emit('refreshStudents', students);
        });
    });

    app.post('/addAnswer', function(req, res) {
        answers[req.user.name] = req.body.answer;
        io.emit('refreshAnswers', answers);
        res.end();
    });

    app.post('/addWord', function(req, res) {
        words.push({word: req.body.word, guessed:false});
        io.emit('refreshWords', words);
        res.end();
    });

    app.post('/deleteWord', function(req, res) {
        words.splice(req.body.index, 1);
        io.emit('refreshWords', words);
        res.end();
    });
};
