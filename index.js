const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const url = require('./routes/url');
const tiny = require('./routes/tiny');

const PORT = process.env.PORT || 8080;
const DB = process.env.MONGODB_URI;

mongoose.connect(DB);

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.use('/url', url);

app.use('/tiny', tiny);

app.listen(PORT, function() {
    console.log('Example app listening on port ' + PORT);
});