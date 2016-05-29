'use strict';

var path = process.cwd();


//var searchLayer = require(path + '/app/auth/clientAuth.js');
module.exports = function (app) {
	app.route('/').get(function (req, res) {
	    console.log(path)
		res.sendFile(path + '/app/dist/index.html');
		});


	app.route("/auth/login").post(function (req, res) {

			console.log("query = ", req.body);
				
				res.status(200).json({token:1234,message:"success"});
		
	});
	
	
};
