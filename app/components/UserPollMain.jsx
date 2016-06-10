
var React = require('react');
var ReactPropTypes = React.PropTypes;
var UserPollActions = require('../actions/UserPollActions');
var PollItem = require('./UserPollItem.jsx');

var UserPollMain = React.createClass({

  propTypes: {
    allPolls: ReactPropTypes.object.isRequired,
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are polls.
    if (Object.keys(this.props.allPolls).length < 1) {
      return null;
    }

    var allPolls = this.props.allPolls;
    var polls = [];

    for (var key in allPolls) {
      polls.push(<PollItem key={key} poll={allPolls[key]} />);
    }

    return (

        <ul id="poll-list">{polls}</ul>

    );
  },


});

module.exports = UserPollMain;