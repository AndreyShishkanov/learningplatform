const Attachment = require('../../db/models/attachment');
const fs = require('fs');
const multer = require('multer');

module.exports = function(app, io){

    const storageFolder = '/files_storage/';
    
    const upload = multer({ storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, app.locals.rootPath + storageFolder)
        },
        filename: function (req, file, cb) {
            cb(null, file.originalname)
        }
    })}).single('file');

    io.on('connection', function (socket) {
        socket.on('play', (time) => {
            io.emit('play', time);
        });
        socket.on('pause', (time) => {
            io.emit('pause', time);
        });
        socket.on('setTime', (time) => {
            io.emit('setTime', time);
        });
        socket.on('rateChange', (time) => {
            io.emit('rateChange', time);
        });
        socket.on('changeMedia', (mediaId) => {
            io.emit('changeMedia', mediaId);
        });
    });

    app.post('/api/upload', async (req, res) => {

        const dir = app.locals.rootPath + storageFolder;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }

        upload(req, res, async (err) => {
            if (err) {
                return res.end(err.toString());
            }
    
            let attachment = new Attachment({
                name: req.file.filename,
                href: storageFolder + req.file.filename,
                type: req.file.mimetype,
                selected: false
            });
    
            const media = await attachment.save();
            
            await selectMedia(media);
    
            res.end();
        });
    });
    
    app.get('/api/getMediaList', async (req, res) => {
        const list = await Attachment.find({});
        res.send(list);
    });
    
    app.delete('/api/deleteMedia/:id', async (req, res) => {
        const result = await deleteMedia(req.params.id);
        
        res.send(result);
    });
    
    app.post('/api/setCurrentMedia', async (req, res) => {
        const result = await selectMedia(req.body.attachment, res);

        res.send(result);
    });
    
    async function deleteMedia(id){
        const media = await Attachment.findById(id);
        await media.remove();
        if (media.selected){
            const media = await Attachment.findOne();
            await selectMedia(media);
            return media;
        }
        return null;
    }
    
    async function selectMedia(attachment){
        await unselectAllMedia();
        
        const media = await Attachment.findById(attachment._id);
        media.selected = true;
        await media.save();
    
        io.emit('changeMedia');
    }
    
    async function unselectAllMedia() {
        await Attachment.update({selected: true},{selected: false},{multi: true});
    }
};
