const app = require('./config/express')();
const initSocket = require('./socket');

const server = app.listen(3030, () => {
    console.log('initialize server.js');

    initSocket(require('socket.io')(server));
});