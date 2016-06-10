
var AppDispatcher = require('../dispatcher');
var EventEmitter = require('events').EventEmitter;


var _ = require('underscore');
var loginError = ""
var user = ""

// Extend ProductStore with EventEmitter to add eventing capabilities
var AuthStore = _.extend({}, EventEmitter.prototype, {


logout: function()
{
   user = "";
   this.emitChange();
},



setErrorMsg: function(msg) {
    console.log("inside setErrorMsg, msg = ", msg)
        loginError = msg;
        user="";
        this.emitChange()
    },

setUserName: function(userName) {
    user = userName;
       this.emitChange()
    },
getCurrentUser: function() {
        return user;
    },
    
getLoginError: function()
    {
        return loginError;
    },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(action) {
  console.log("got action: ",action)

  switch(action.type) {

    // Respond to RECEIVE_DATA action
    case "LOGIN_FAILED":
        AuthStore.setErrorMsg(action.message);
        break;

    // Respond to SELECT_PRODUCT action
    case "LOGIN_SUCCESS":
        AuthStore.setUserName(action.user);
        break;
    case "LOGOUT":
        AuthStore.logout();
        break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  //ProductStore.emitChange();

  return true;

});

module.exports = AuthStore;