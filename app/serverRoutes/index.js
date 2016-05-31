'use strict';

var path = process.cwd();

var serverAuth = require(path + '/app/auth/serverAuth.js');


module.exports = function (app) {
	app.route('/').get(function (req, res) {
	    console.log(path)
		res.sendFile(path + '/app/dist/index.html');
		});


	app.route("/auth/login").post(function (req, res) {

			serverAuth.processLogin(req.body.login.trim(), req.body.password.trim(), function(err,token,message)
			{
				if (err) 
				{
					console.log(err);
					res.status(400).json({message:"Bad login information"})
				}
				else
				{
					res.status(200).json({token:token,message:"Login successful"});
				}
			});
				
				
		
	});
	
	app.route("/auth/signup").post(function (req, res) {
			
			console.log("signup query = ", req.body);
			serverAuth.saveUser(req.body.login.trim(), req.body.password.trim(), function(err)
			{
			if (err	) 
			{
				console.log(err);
				res.status(400).json({error:false, message:"Signup couldn't complete, perhaps user already exists."});	
			}	
			else {
				res.status(200).json({error:false, message:"Signup successfull"});	
				}
			});
		
	});
	
	
};
