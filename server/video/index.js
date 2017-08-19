const Attachment = require('../../db/models/attachment');

module.exports = function(app, io, rootPath){

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

    app.post('/upload', function(req, res) {
        if (!req.files)
            return res.status(400).send('No files were uploaded.');

        let file = req.files.file;

        file.mv(rootPath + '/files_storage/' + file.name, function(err) {
            if (err) return res.status(500).send(err);

            unselectAllMedia(() => {
                let attachment = new Attachment({
                    name: file.name,
                    href: '/files/' + file.name,
                    type: file.mimetype,
                    selected: true
                });

                attachment.save(function(err) {
                    if (err) throw err;
                    res.json('File uploaded!');
                });
            });
        });
    });
    app.post('/getMediaList', function(req, res) {
        Attachment.find({}, function(err, docs){

            if(err) res.send(err);

            res.send(docs);
        });
    });
    app.post('/setCurrentMedia', function(req, res) {
        unselectAllMedia(() => {
            Attachment.findById(req.body.attachment._id, function(err, doc){
                if(err) res.send(err);
                    doc.selected = true;
                    doc.save(function(err) {
                        if (err)
                            console.log('error')
                        else
                            console.log('success')
                    });
            });
        });
    });
    function unselectAllMedia(callback) {
        Attachment.update({selected: true},{selected: false},{multi: true}, function (err, raw) {
            if (err) return handleError(err);
            callback();
        });
    }
};
