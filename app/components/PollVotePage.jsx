

var React = require('react');
var PollVotePageStore = require('../stores/PollVotePageStore');
var PollVoteActions = require('../actions/PollVoteActions');
var AuthStore = require('../stores/AuthStore');
var PollListItem = require('./PollListItem.jsx');
var ReactHighcharts= require("react-highcharts")
var Select = require('react-select');
var Router = require("react-router")
var History = Router.History

var options = [
    { value: 'one', label: 'One' },
    { value: 'two', label: 'Two' }
];



function getChartOptions(pollData)
{
  var chartOptions = {
   
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'

        },
        credits: {
            enabled: false
          },
        title: {
            text: 'Browser market shares January, 2015 to May, 2015',
            style: {
                 "font-family": 'Roboto',
                "font-size": "2em",
                fontWeight: 'bold'
            }
        },
        subtitle: {
            text: 'Click the slices to view versions. Source: netmarketshare.com.',
             style: {
                 "font-family": 'Roboto',
                "font-size": "1.3em"
               
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                     style: {
                 "font-family": 'Roboto',
                "font-size": "1em"
               
            }
                    
                }
                
            }
        },
        series: [{
            name: 'Votes',
            colorByPoint: true,
            data: []
            //   {
            //     name: 'Microsoft Internet Explorer',
            //     y: 56.33
            // }, {
            //     name: 'Chrome',
            //     y: 24.03,
            //     sliced: true,
            //     selected: true
            // }, {
            //     name: 'Firefox',
            //     y: 10.38
            // }, {
            //     name: 'Safari',
            //     y: 4.77
            // }, {
            //     name: 'Opera',
            //     y: 0.91
            // }, {
            //     name: 'Proprietary or Undetectable',
            //     y: 0.2
            // }]
        }]
    }

  chartOptions.title.text=pollData.pollName;
  chartOptions.subtitle.text="Created by "+pollData.author+" on "+pollData.creationDate.slice(0,19);
  var polls = pollData.polls[0]
  for (var key in polls) {
      chartOptions.series[0].data.push({name:key, y: Number(polls[key])+1});
    }
   chartOptions.series[0].data[0].sliced=true;
   chartOptions.series[0].data[0].selected=true;
  //  console.log("inside getCharOptions, pollData = ", pollData);
//  console.log("chartOptions = ",chartOptions)
  return chartOptions;  
  
}


var PollVotePage = React.createClass({

  getInitialState: function() {
    // console.log("id = ",this.props.params.pollid);
    
    // console.log(pollData);
     return({chartOptions:null});

  },

  componentDidMount: function() {
    PollVotePageStore.getPollFromServer(this.props.params.pollid);
    PollVotePageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    PollVotePageStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
   
  render: function() {

  

  var disabled = ""
  if (AuthStore.getCurrentUser()=="")
  {
      disabled="disabled"
  }
  

    var disabledDelete = "";
    if (this.state.chartOptions)
        {
            if ((this.state.pollData.author != AuthStore.getCurrentUser()) && (AuthStore.getCurrentUser()!="admin")) disabledDelete="disabled";
        }
    // console.log("PollVOtePage, authStore = ",AuthStore.getCurrentUser,disabled)

    return (
      <div>
          {this.state.chartOptions && (
             <ReactHighcharts config = {this.state.chartOptions}></ReactHighcharts>
          )}
          {this.state.chartOptions && (
          <div>

          <div className = "col-sm-12">
          <div className = "col-sm-3"></div>
               <div className = "col-sm-5 marginpaddingright">
          <input className="addpollinput" type="text" ref="newItem" placeholder="Add a new item (authorized user)" disabled={disabled}></input>
         
                  </div>   
             <div className = "col-sm-1"> <button className="btn btn-block btn-default" onClick={this._onSaveClick} disabled={disabled}>Add</button> </div>   
             <div className = "col-sm-3"></div>        
          </div>

            <div className = "col-sm-12">
               <div className = "col-sm-3"></div>
               <div className = "col-sm-6">
                <Select name="form-field-name" clearable={false}  searchable={false}  value={this.state.listValue}   options={this.state.pollListOptions}   onChange={this._onListChange}/>
                <div className = "col-sm-12 margin-top">

              
              <div className= "col-sm-4">
                  <button className="btn  btn-block btn-primary responsive-width" onClick={this._onVoteClick}>Vote</button>
              </div>
              <div className= "col-sm-4">
                 <button className="btn btn-block btn-info responsive-width" onClick={this._onBack}>Back</button>
              </div>
                   <div className= "col-sm-4">
                 <button className="btn btn-block btn-danger responsive-width" disabled={disabledDelete} onClick={this._onDeleteClick}>Delete Poll</button>
              </div>

                </div>
                </div>
              <div className = "col-sm-3"></div>

            </div>
             </div>
          )}
      </div>
      
    );
  },
  _onBack: function(){

    this.props.history.goBack()
  },
  
  _onChange: function() {
      var pollData = PollVotePageStore.getPoll()
       var polls = pollData.polls[0]
       var pollListOptions=[]
       for (var key in polls) {
          pollListOptions.push({label:key, value:key});
      }
    this.setState({chartOptions:getChartOptions(pollData), pollListOptions:pollListOptions, listValue:pollListOptions[0].label,pollData: pollData});
  },
  
  _onListChange: function(val) {
    this.setState({listValue:val.label});
},
  _onVoteClick: function(l) {
    PollVoteActions.vote(this.state.listValue)
},

  _onDeleteClick: function() {
    console.log("onDeleteClick, id=",this.state.pollData.id)
    PollVoteActions.deletepoll(this.state.pollData.id);
    this.props.history.goBack()
    
  },
});

module.exports = PollVotePage;

