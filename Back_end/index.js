// importing all modules
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var router = require('./Router/appRoutes');
var port = process.env.PORT || 8000;

// initialing app
app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', router);

http.createServer(app).listen(port);
console.log("server started");