
var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var auth = require("../auth/clientAuth.js");
var router = require("react-router");
var transitionTo = router.transitionTo;
var hashHistory = router.hashHistory

var CHANGE_EVENT = 'change';

var _polls = {};
var _pollName=""

/**
 * Create a poll item.
 * @param  {string} text The content of the poll
 */




function getAllPolls(callback)
{
  
var xhr = new XMLHttpRequest();
xhr.open('GET', encodeURI('polls/all'));
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


function deletePoll(id, callback)
{
  var xhr = new XMLHttpRequest();
  var token = auth.getToken();
    var user = 'id=' + encodeURIComponent(id) +"&token="+encodeURIComponent(token);
    xhr.open('post', '/deletepoll');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    xhr.responseType = 'json';
    xhr.onload = function() {
      
     if (this.status == 200) {
        return callback(null);
      } else {
        
        return callback("error");
      }
      
   };
  xhr.send(user);
  
}



/**
 * Delete a poll item.
 * @param  {string} id
 */
function destroy(id) {
  delete _polls[id];
}

/**
 * Delete all the completed poll items.
 */


var PollListViewStore = assign({}, EventEmitter.prototype, {


  /**
   * Get the entire collection of polls.
   * @return {object}
   */
  getAllFromServer: function()
  {
    getAllPolls(function(polls){
      _polls = polls;
      console.log("inside getAllPolls, _polls = ",_polls);
       this.emit(CHANGE_EVENT);
    }.bind(this));
  },
  
  deleteItem(id)
  {
    deletePoll(id, function(err){
      if (err) console.log("Error deleting poll with id = ",id);
      this.getAllFromServer();
      
    }.bind(this))
    
  },
  
  getAll: function() {
      return _polls;
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
    case "POLLITEM_CREATE":
      text = action.text.trim();
      if (text !== '') {

        PollListViewStore.emitChange();
      }
      break;
      
      case "VOTEITEM_DELETE":
      var id = action.id.trim();

      PollListViewStore.deleteItem(id);
     
      break;
      
      case "POLL_NAMECHANGE":
      text = action.text.trim();
      if (text !== '') {

        PollListViewStore.emitChange();
      }
      break;


    case "POLLITEM_UPDATETEXT":
      text = action.text.trim();
      if (text !== '') {

        PollListViewStore.emitChange();
      }
      break;
    
    case "POLL_SAVE":


        PollListViewStore.emitChange();
     
      break;

    case "POLLITEM_DESTROY":

      PollListViewStore.emitChange();
      break;


    default:
      // no op
  }
});

module.exports = PollListViewStore;