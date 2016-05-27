var React = require("react");

module.exports = React.createClass({
    render:function(){
        return(
                 <div className = "container-fluid header">
                     <div className="col-sm-12">
                     <h1>Simple Vote</h1>
                       <h4>Online votes - create, share, edit and aggregate custom polls</h4>
                     </div>
                </div>
        )
    }
})