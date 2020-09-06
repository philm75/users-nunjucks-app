const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
require('./db/mongoose');

const config = require('./config/Config');
const users = require('./routes/Users');

const app = express();
const port = config.PORT;

// Define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public');

// Registers the template engine
app.set('view engine', 'html');

app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Map users url to users routes
app.use('/users', users);

nunjucks.configure(['src/views', 'node_modules/govuk-frontend/'], {autoescape: true, express: app});

app.listen(port, () => console.log(`Server started on ${port}`));