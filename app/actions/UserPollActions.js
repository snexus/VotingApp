

var AppDispatcher = require("../dispatcher");


var PollActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    AppDispatcher.dispatch({
      actionType: "POLLITEM_CREATE",
      text: text
    });
  },
  
   changeName: function(text) {
    AppDispatcher.dispatch({
      actionType: "POLL_NAMECHANGE",
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: "POLLITEM_UPDATETEXT",
      id: id,
      text: text
    });
  },


  /**
   * @param  {string} id
   */
  destroyPollListItem: function(id) {
    AppDispatcher.dispatch({
      actionType: "POLLLISTITEM_DESTROY",
      id: id
    });
  },
   
  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: "POLLITEM_DESTROY",
      id: id
    });
  },
  
   savePoll: function(id) {
    AppDispatcher.dispatch({
      actionType: "POLL_SAVE",
    });
  }
  

  /**
   * Delete all the completed ToDos
   */


};

module.exports = PollActions;