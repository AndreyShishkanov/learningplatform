const Attachment = require('../../db/models/attachment');
const fs = require('fs');
const multer = require('multer');

module.exports = function(app, io){

    const upload = multer({ storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, app.locals.rootPath + '/files_storage/')
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })}).single('file');

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

    app.post('/api/upload', function(req, res) {

        const dir = './files_storage/';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        upload(req, res, function (err) {
            if (err) {
                return res.end(err.toString());
            }
            unselectAllMedia(() => {
                let attachment = new Attachment({
                    name: req.file.filename,
                    href: '/files_storage/' + req.file.filename,
                    type: req.file.mimetype,
                    selected: true
                });

                attachment.save(function(err) {
                    if (err) throw err;
                    res.end();
                  });
            });
        });
    });
    app.post('/api/getMediaList', function(req, res) {
        Attachment.find({}, function(err, docs){

            if(err) res.send(err);

            res.send(docs);
        });
    });
    app.post('/api/setCurrentMedia', function(req, res) {
        unselectAllMedia(() => {
            Attachment.findById(req.body.attachment._id, function(err, doc){
                if(err) res.send(err);
                    doc.selected = true;
                    doc.save(function(err) {
                        if (err)
                            console.log('error');
                        else
                            console.log('success');
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
