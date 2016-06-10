
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
function create(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
  _polls[id] = {
    id: id,
    complete: false,
    text: text
  };
}

function nameChange(text) {
  // Hand waving here -- not showing how this interacts with XHR or persistent
  // server-side storage.
  // Using the current timestamp + random number in place of a real id.
  _pollName=text
}

/**
 * Update a poll item.
 * @param  {string} id
 * @param {object} updates An object literal containing only the data to be
 *     updated.
 */
function update(id, updates) {
  _polls[id] = assign({}, _polls[id], updates);
}

function savePoll()
{
  var xhr = new XMLHttpRequest();
  var token = auth.getToken();
    var user = 'pollname=' + encodeURIComponent(_pollName) + '&polls=' + JSON.stringify(_polls)+"&token="+encodeURIComponent(token);
    xhr.open('post', '/savepoll');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    xhr.responseType = 'json';
    xhr.onload = function() {
      
     if (this.status == 200) {
        console.log("200")
      } else {
        
    console.log("savePoll failed")
      }
      
   };
  xhr.send(user);
  hashHistory.push('dashboard')
  
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


var PollStore = assign({}, EventEmitter.prototype, {


  /**
   * Get the entire collection of polls.
   * @return {object}
   */
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
        create(text);
        PollStore.emitChange();
      }
      break;
      
      case "POLL_NAMECHANGE":
      text = action.text.trim();
      if (text !== '') {
        nameChange(text);
        PollStore.emitChange();
      }
      break;


    case "POLLITEM_UPDATETEXT":
      text = action.text.trim();
      if (text !== '') {
        update(action.id, {text: text});
        PollStore.emitChange();
      }
      break;
    
    case "POLL_SAVE":

        savePoll();
        PollStore.emitChange();
     
      break;

    case "POLLITEM_DESTROY":
      destroy(action.id);
      PollStore.emitChange();
      break;


    default:
      // no op
  }
});

module.exports = PollStore;