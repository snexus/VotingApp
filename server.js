'use strict';

var express = require('express');
var routes = require('./app/serverRoutes/index.js');
var path = require("path");
      var bodyparser = require('body-parser')
var app = express();


app.use(bodyparser.urlencoded({extended: false}))
console.log(process.cwd() + '/app/dist')
//app.use('/dist', express.static(process.cwd() + '/app/dist'));
app.use(express.static(path.join(__dirname,"./app/dist")));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});