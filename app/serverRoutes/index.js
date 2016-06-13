'use strict';

var path = process.cwd();

var serverAuth = require(path + '/app/auth/serverAuth.js');
var sc = require(path + '/app/serverComponents/serverComponents.js');


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
	
		app.route("/polls/all").get(function (req, res) {

			sc.getAllPolls(function(err,polls){
				console.log("err,polls = ",err,polls)
				if (err) 
				{
					console.log(err);
					res.status(400).json({message:"Error processing request"})
				}
				else
				{
						res.status(200).json(polls);
				}
			});
				
				
		
	});
	
			app.route("/poll/:id").get(function (req, res) {

			sc.getPollById(req.params.id, function(err,poll){
				console.log("err,poll = ",err,poll)
				if (err) 
				{
					console.log(err);
					res.status(400).json({message:"Error processing request"})
				}
				else
				{
						res.status(200).json(poll);
				}
			});
				
				
		
	});
	
	
		app.route("/savepoll").post(function (req, res) {
			var pollName = req.body.pollname.trim();
			var polls = JSON.parse(req.body.polls);
			var userToken = req.body.token.trim()
			console.log("Save poll on server: ",pollName, polls, userToken);
			serverAuth.getUser(userToken,function(err,user){
					if (err) 
				{
					console.log(err);
					res.status(400).json({message:"Bad user"})
				}
				else
				{
					sc.savePoll(user.login, pollName, polls, function(err)
					{
					if (err) 
							{
								console.log(err);
								res.status(400).json({message:"Save unsuccessful"})
							}
					else
					{
							
						res.status(200).json({message:"Save successful"});
					}
				
						})
						console.log(user);
					}
			});
		
			// serverAuth.processLogin(req.body.login.trim(), req.body.password.trim(), function(err,token,message)
			// {
			// 	if (err) 
			// 	{
			// 		console.log(err);
			// 		res.status(400).json({message:"Bad login information"})
			// 	}
			// 	else
			// 	{
			// 		res.status(200).json({token:token,message:"Login successful"});
			// 	}
			// });
				
				
		
	});
	
		app.route("/deletepoll").post(function (req, res) {
			var id = req.body.id.trim();
			var userToken = req.body.token.trim();
			console.log("Delete poll on server (id, token): ",id, userToken);
			serverAuth.getUser(userToken,function(err,user){
					if (err) 
				{
					console.log(err);
					res.status(400).json({message:"Bad user"});
				}
				else
				{
					sc.deletePoll(user.login, id, function(err)
					{
					if (err) 
							{
								console.log(err);
								res.status(400).json({message:"Delete unsuccessful"});
							}
					else
					{
							
						res.status(200).json({message:"Delete successful"});
					}
				
						});
						
					}
			});
	});
	
	
	
	
			app.route("/vote").post(function (req, res) {
			var id = req.body.id.trim();
			var label = req.body.label.trim();
			console.log("Vote on server: ",id, label);

					sc.vote(id, label,function(err)
					{
					if (err) 
							{
								console.log(err);
								res.status(400).json({message:"Vote unsuccessful"})
							}
					else
					{
							
						res.status(200).json({message:"Vote successful"});
					}
				
						})
					}
		
		
	);
	
	
	
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
