$(function() {
    var socket = io();

    $('#next').click(function () {
        socket.emit('next');
    });
    $('#prev').click(function () {
        socket.emit('prev');
    });
});