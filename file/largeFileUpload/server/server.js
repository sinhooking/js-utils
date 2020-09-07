const express = require('express');
const app = express()

app.use(express.json())
app.use(require('cors')())

app.use('/uploads', express.static('uploads'));

const initSocket = require('./socket');
const server = app.listen(3030, () => {
    initSocket(require('socket.io')(server));
})