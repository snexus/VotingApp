var express = require("express"); 
var path = require("path"); 
var app = express();
app.use(express.static(path.join(__dirname,"../app/dist")));
var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});