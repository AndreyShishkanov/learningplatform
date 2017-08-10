module.exports = function (server) {
    const io = require('socket.io').listen(server);

    let word = "";

    io.on('connection', function (socket) {
        socket.on('play', function (time) {
            io.emit('play', time);
        });
        socket.on('pause', function (time) {
            io.emit('pause', time);
        });
        socket.on('setTime', function (time) {
            io.emit('setTime', time);
        });
        socket.on('rateChange', function (time) {
            io.emit('rateChange', time);
        });


    });
}
