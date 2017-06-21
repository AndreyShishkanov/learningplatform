module.exports = function (server) {
    var io = require('socket.io').listen(server);

    io.on('connection', function (socket) {
        // socket.on('login', function () {
        //     io.emit('changeSlide', renderSlide());
        // });
        socket.on('play', function () {
            io.emit('play');
        });
        socket.on('pause', function () {
            io.emit('pause');
        });
        socket.on('setTime', function (time) {
            io.emit('setTime', time);
        });
    });
}
