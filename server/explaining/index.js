module.exports = (app, io) => {
    let words = [];
    let students = [];
    let answers = {};

    io.on('connection', (socket) => {
        if(socket.user.role.name === 'Student'){
            students.push(socket.user);
        }
        io.emit('refreshStudents', students);
        io.emit('refreshWords', words);
        io.emit('refreshAnswers', answers);

        socket.on('answer', (answer) => {
            answers[socket.user.name] = answer;
            io.emit('refreshAnswers', answers);
        });

        socket.on('addWord', (word) => {
            words.push({word: word, guessed:false});
            io.emit('refreshWords', words);
        });

        socket.on('deleteWord', (index) => {
            words.splice(index, 1);
            io.emit('refreshWords', words);
        });

        socket.on('nextWord', () => {
            const word = words.find(x=>x.guessed === false);
            if(!word) return;
            word.guessed = true;
            answers = {};
            io.emit('refreshAnswers', answers);
            io.emit('refreshWords', words);
        });

        socket.on('disconnect', () => {
            if(socket.user.role.name === 'Student') {
                students.splice(students.indexOf(socket.user), 1);
            }
            io.emit('refreshStudents', students);
        });
    });
};
