const siofu = require("socketio-file-upload");
const path = require('path');

module.exports = function initSocket(io) {
    console.log('initialize socket.io')
    const largeUpload = io.of('/largeUpload');
    largeUpload.on('connection', (socket) => {

        var uploader = new siofu();
        uploader.dir = path.resolve("uploads");
        uploader.listen(socket);

        uploader.on('complete', (event) => {
            console.log(event)
        })

        socket.on('file', (data) => {
            console.log(data)
        })
    });
}