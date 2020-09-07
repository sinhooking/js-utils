const express = require('express');

module.exports = () => {
    const app = express()

    app.use(express.json())
    
    app.use(require('cors')())

    initializeStaticFolder(app);

    return app;
}

function initializeStaticFolder (app) {
    const fs = require('fs');
    const path = require('path');
    
    if (!fs.existsSync(path.resolve("uploads"))) {
        fs.mkdirSync(path.resolve("uploads"), { recursive: true });
    }

    app.use('/uploads', express.static('uploads'));
}