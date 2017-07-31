module.exports = function (server) {
    var io = require('socket.io').listen(server);

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
