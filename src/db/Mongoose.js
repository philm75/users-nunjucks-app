const mongoose = require('mongoose');
const config = require('../config/Config');

const connectionUrl = config.MONGODB_URL;

mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});