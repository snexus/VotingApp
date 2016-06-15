

var UserPollMain = require('./UserPollMain.jsx');
var React = require('react');
var PollStore = require('../stores/UserPollStore');
var PollActions = require('../actions/UserPollActions');
var PollTextInput = require('./PollTextInput.jsx');



function getPollState() {
  return {
    allPolls: PollStore.getAll()
  };
}



var UserPolls = React.createClass({

  getInitialState: function() {
    PollActions.clearAll();
    return getPollState();
  },

  componentDidMount: function() {
    PollStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PollStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
    <div className="row">

      <div className="col-sm-2"></div>
      <div className="col-sm-8  user-poll">
               <h3>New poll creation page</h3>
                   <img src="http://www.megaicons.net/static/img/icons_title/8/178/title/adds-add-list-icon.png" className="img-responsive center-block image" ></img>
 
        <input type="text" ref="pollName" placeholder="Enter name of the poll here" onChange={this._onPollNameChange}></input>
        <div className="user-pollcard">
          <h4>Add options to the poll</h4>
          <PollTextInput  id="new-todo"   className="inputOptions" placeholder="Type an option and press enter. Double click on option to edit. Press X button to delete"  onSave={this._onPollTextSave} />
           <UserPollMain allPolls={this.state.allPolls} />
        </div>
        <div className= "col-sm-3"></div>
        <div className= "col-sm-3">
          <button className="btn btn-block btn-info responsive-width" onClick={this._onSaveClick}>Save</button>
        </div>
           <div className= "col-sm-3">
         <button className="btn btn-block btn-danger responsive-width">Discard</button>
        </div>
      </div>
      <div className="col-sm-2"></div>
    </div>



      // <div>
      
      //   <UserPollHeader />
      //   <UserPollMain
      //     allPolls={this.state.allPolls}
      //   />
      // </div>

    );
  },

  /**
   * Event handler for 'change' events coming from the PollStore
   */
  _onChange: function() {
    this.setState(getPollState());
  },
  
  _onPollTextSave: function(text) {
    if (text.trim()){
      PollActions.create(text);
    }
  },
    _onPollNameChange: function(text)
  {
    //console.log(this.refs.pollName.value)
     PollActions.changeName(this.refs.pollName.value);
  },
    _onSaveClick: function(text)
  {
    //console.log(this.refs.pollName.value)
     PollActions.savePoll();
  }
  

});

module.exports = UserPolls;