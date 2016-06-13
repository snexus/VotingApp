

var React = require('react');
var ReactPropTypes = React.PropTypes;
var router = require("react-router")
var Link =router.Link
var AuthStore = require('../stores/AuthStore');
var UserPollActions = require('../actions/UserPollActions');



var PollListItem = React.createClass({

  propTypes: {
   poll: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    
    var poll = this.props.poll;

    var currentUser = AuthStore.getCurrentUser();
    var displayDelete = false;
    if (poll.author == currentUser) displayDelete=true;
   
    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    var link = "pollvotepage/"+poll.id;
    return (
      
       <Link to={link}>
      <div className="polllistitem" key={poll.id}>

                    <h6>Created by {poll.author} on {poll.creationDate.slice(0,19)}
                    </h6>
                    
                    <h4>{poll.pollName} </h4>
              </div>
          </Link>

         
    );
  },

              // <button className="btn btn-danger" onClick={this._onDestroyClick}>
              //   <i className="glyphicon glyphicon-remove"></i></button>

  _onClick: function() {
    this.setState({isEditing: true})
  },
  
  _deleteItemClicked: function() {
    console.log("polllistitem delete pressed")
    UserPollActions.destroyPollListItem(this.props.poll.id);
    
  },

  /**
   * Event handler called within PollTextInput.
   * Defining this here allows PollTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */

});

module.exports = PollListItem;
/*
li>
              <label>
               Option1
              </label>
              <button className="remove-btn">
                <i className="glyphicon glyphicon-remove"></i></button>
          </li>
*/   
// <div key={poll.id}>
      //         <label onDoubleClick={this._onDoubleClick}>
      //         <h3>{poll.author}</h3>
      //         <h3>{poll.creationDate}</h3>
      //         </label>

      //     </div>