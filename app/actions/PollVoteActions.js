

var AppDispatcher = require("../dispatcher");


var PollVoteActions = {

  /**
   * @param  {string} text
   */
  vote: function(label) {
    AppDispatcher.dispatch({
      actionType: "VOTEITEM_VOTE",
      label: label
    });
  },
  
    addvoteoption: function(id,text) {
    AppDispatcher.dispatch({
      actionType: "VOTEITEM_ADDVOTEOPTION",
      id: id,
      text:text
    });
  },
  
    deletepoll: function(id) {
    AppDispatcher.dispatch({
      actionType: "VOTEITEM_DELETE",
      id: id
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

module.exports = PollVoteActions;