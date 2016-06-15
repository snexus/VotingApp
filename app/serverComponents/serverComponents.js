var mongoose = require('mongoose');
var PollModel = mongoose.model("Polls");

module.exports = {
    savePoll: function(user, pollName, polls,callback) {
        var id = undefined
        var pollObject = {}
        for (var key in polls) {
              if (!polls.hasOwnProperty(key)) { continue; }
              if (!id) id = key;
              pollObject[polls[key].text] = 0;
              
            }
      console.log("inside savePoll: id, pollObject ", id, pollObject)
                  var poll = new PollModel({author:user, id:id, pollName: pollName, creationDate: new Date(), polls:pollObject});
                  poll.save(function(err){
                      return callback(err);
              })
      
    },
    
    getAllPolls: function(callback) {
    PollModel.find({}, function(err, docs) {
        return callback(err,docs)
        });
    },
    
        getPollById: function(id, callback) {
        PollModel.findOne({id: id}, function(err, docs) {
        return callback(err,docs)
        });
    },
        vote: function(id, label,callback) {
            PollModel.findOne({id: id}, function(err, poll) {
                if (err) {return callback(err) }
               // console.log("inside vote, poll, n = ",poll, Number(poll.polls[0][label])+1)
            var updatePoll = poll.polls[0]
            updatePoll[label] = Number(poll.polls[0][label])+1;
            console.log("inside vote, uppoll1 = ",updatePoll)
            poll.update({$set:{polls:updatePoll}}, function(error, updpoll){
                               console.log("inside vote, uppoll2 = ",updpoll)
               return callback(err) 
                
            })

       
        });
    },
    
        deletePoll: function(username, id, callback) {
            PollModel.findOne({id: id}, function(err, poll) {
                if (err) {return callback(err) }
            if ((poll.author != username) && (username!="admin")) callback("invalid user");
            poll.remove( function(err){
               return callback(err) ;
            });
        });
    },
    
        updatePollOption: function(id, text,callback) {
            PollModel.findOne({id: id}, function(err, poll) {
                if (err) {return callback(err) }
               // console.log("inside vote, poll, n = ",poll, Number(poll.polls[0][label])+1)
            var updatePoll = poll.polls[0]
            updatePoll[text] = 0;
            //updatePoll[label] = Number(poll.polls[0][label])+1;
            console.log("inside vote, uppoll1 = ",updatePoll)
            poll.update({$set:{polls:updatePoll}}, function(error, updpoll){
                               console.log("inside updatepolloption, uppoll2 = ",updpoll)
               return callback(err) 
                
            })

       
        });
    },
    
  
}