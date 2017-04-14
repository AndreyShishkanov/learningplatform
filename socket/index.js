var app = require('../app');
var pug = require('pug');
var fs = require('fs');

var slidesPath = app.get('views') + '/slides/';
var slide = 1;
var maxSlides = slide;
fs.readdir(slidesPath, (err, files) => {
    maxSlides = files.length;
});

module.exports = function (server) {
    var io = require('socket.io').listen(server);

    io.on('connection', function (socket) {
        socket.on('login', function () {
            io.emit('changeSlide', renderSlide());
        });
        socket.on('next', function () {
            ++slide;
            io.emit('changeSlide', renderSlide());
        });
        socket.on('prev', function () {
            --slide;
            io.emit('changeSlide', renderSlide());
        });
    });

}

function renderSlide() {
    if(slide < 1) slide = maxSlides;
    if(slide > maxSlides) slide = 1;

    return pug.renderFile(slidesPath + slide + '.pug');
}
