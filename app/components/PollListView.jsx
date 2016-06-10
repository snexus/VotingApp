

var React = require('react');
var PollListViewStore = require('../stores/PollListViewStore');
var AuthStore = require('../stores/AuthStore');
var PollListItem = require('./PollListItem.jsx');
//var PollActions = require('../actions/UserPollActions');



function getPollState() {
  return {
    polls: PollListViewStore.getAllFromServer()
  };
}




var PollList = React.createClass({

  getInitialState: function() {
    return getPollState();
  },

  componentDidMount: function() {
    PollListViewStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PollListViewStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
   
  render: function() {


    var allPolls = this.state.polls;
    if (!allPolls) return null;

    var user=this.props.params.user
    console.log("inside PollListView,props = ",this.props)
    var displayName = "All"
    if (user == "user")
    {
      var currentUser = AuthStore.getCurrentUser();
      displayName = "My";
      console.log("inside PollListView, currentUser = ", currentUser)
      console.log("inside PollListView, allPolls = ", allPolls)
      if (allPolls)
        {allPolls=allPolls.filter(function(poll){return poll.author==currentUser})}
    }
    console.log("inside render list, allPOlls = ", allPolls,this.state)
    var polls = [];

    for (var key in allPolls) {
      polls.push(<PollListItem key={allPolls[key]['id']} poll={allPolls[key]} />);
    }
    return (
          <div className="container body">
                <div class="row">
              <div className="col-sm-2"></div>
              <div className="col-sm-8">
              <h3 className="user-poll zero-top-margin">{displayName} Polls</h3>
           {polls}
           </div>
           </div>
        </div>
       
    );
  },
  _onChange: function() {
    this.setState({polls:PollListViewStore.getAll()});
  },
});

module.exports = PollList;

