

var React = require('react');
var ReactPropTypes = React.PropTypes;
var PollActions = require('../actions/UserPollActions');
var PollTextInput = require('./PollTextInput.jsx');

var classNames = require('classnames');

var PollItem = React.createClass({

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

    var input;
    if (this.state.isEditing) {
      input =
        <PollTextInput
          className="edit"
          onSave={this._onSave}
          value={poll.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li key={poll.id}>
              <label onDoubleClick={this._onDoubleClick}>
               {poll.text}
              </label>
              <button className="btn btn-danger" onClick={this._onDestroyClick}>
                <i className="glyphicon glyphicon-remove"></i></button>
              {input}
          </li>
    );
  },



  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  /**
   * Event handler called within PollTextInput.
   * Defining this here allows PollTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    PollActions.updateText(this.props.poll.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    PollActions.destroy(this.props.poll.id);
  }

});

module.exports = PollItem;
/*
li>
              <label>
               Option1
              </label>
              <button class="remove-btn">
                <i class="glyphicon glyphicon-remove"></i></button>
          </li>
*/

// <div class="polllistitem">
//             <div class="row">
//               <div class="col-sm-2"></div>
//               <div class="col-sm-8">
//             <h6>by test2, on 06/08/2016</h6>
//             <h4>This is poll's name </h4>
//               </div>
//               <div class="col-sm-2">
             
//                 <i class="glyphicon glyphicon-remove pull-right"></i>
                
//       </div>
//           </div>