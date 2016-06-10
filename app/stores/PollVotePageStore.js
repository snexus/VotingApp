
var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var auth = require("../auth/clientAuth.js");
var router = require("react-router");
var transitionTo = router.transitionTo;
var hashHistory = router.hashHistory

var CHANGE_EVENT = 'change';

var _poll = {};
var _pollName=""

/**
 * Create a poll item.
 * @param  {string} text The content of the poll
 */




function getPollById(id,callback)
{
  
var xhr = new XMLHttpRequest();
xhr.open('GET', encodeURI('poll/'+id));
xhr.onload = function() {
    if (xhr.status === 200) {
       console.log("Success getting all users, xhr = ", JSON.parse(xhr.responseText))
       return callback(JSON.parse(xhr.responseText));
    }
    else {
        alert('Request failed.  Returned status of ' + xhr.status);
        return callback({});
    }
};
xhr.send();
  
}

function updatePoll(id, label,callback)
{
  
var xhr = new XMLHttpRequest();
  var token = auth.getToken();
    var updatePoll = 'label=' + encodeURIComponent(label)+'&id='+encodeURIComponent(id);
    xhr.open('post', '/vote');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    xhr.responseType = 'json';
    xhr.onload = function() {
      
     if (this.status == 200) {
        return callback(null)
      } else {
        
        return callback("Vote failed")
      }
      
   };
  xhr.send(updatePoll);
  
}



/**
 * Delete a poll item.
 * @param  {string} id
 */


/**
 * Delete all the completed poll items.
 */


var PollVotePageStore = assign({}, EventEmitter.prototype, {


  /**
   * Get the entire collection of polls.
   * @return {object}
   */
  getPollFromServer: function(id)
  {
    getPollById(id, function(poll){
      _poll = poll;
      console.log("inside getAllPolls, _polls = ",_poll);
       this.emit(CHANGE_EVENT);
    }.bind(this));
  },
  
  vote: function(label)
  {
   
    updatePoll(_poll.id, label, function(err){
      if (err) console.log(err);
     this.getPollFromServer(_poll.id)
    }.bind(this))
    
  },
  
  getPoll: function() {
      return _poll;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case "VOTEITEM_VOTE":
      text = action.label.trim();
      PollVotePageStore.vote(text);
      break;
      
      case "POLL_NAMECHANGE":
      text = action.text.trim();
      if (text !== '') {

        PollVotePageStore.emitChange();
      }
      break;


    case "POLLITEM_UPDATETEXT":
      text = action.text.trim();
      if (text !== '') {

        PollVotePageStore.emitChange();
      }
      break;
    
    case "POLL_SAVE":


        PollVotePageStore.emitChange();
     
      break;

    case "POLLITEM_DESTROY":

      PollVotePageStore.emitChange();
      break;


    default:
      // no op
  }
});

module.exports = PollVotePageStore;