var React = require("react");
var router = require("react-router")
var Link =router.Link
module.exports = React.createClass({
    render:function(){
        return(
    <div className="row">
      <div className="col-sm-2"></div>

      <div className="col-sm-8">
             <img src="https://pbs.twimg.com/media/Ces3Xt1WwAEzur5.jpg" className="img-responsive center-block" ></img>
              	<div className="panel">
                  	<div className="panel-heading">
                    	<i className="icon icon-chevron-up chevron"></i>
      
                  <div className="panel-content">
                    
                      <div className="btn-group btn-group-justified">
                        <Link to="userpoll" className="btn btn-primary col-sm-3">
                          <i className="glyphicon glyphicon-plus"></i>
                          <p>New poll</p>
                        </Link>
                        <Link to="polls/user" className="btn btn-danger col-sm-3">
                          <i className="glyphicon glyphicon-star"></i>
                          <p>My polls</p>
                        </Link>
                        <Link to="polls/all" className="btn btn-warning col-sm-3">
                          <i className="glyphicon glyphicon-th-list"></i>
                          <p>All polls</p>
                        </Link>
                        <a href="#" className="btn btn-default col-sm-3">
                          <i className="glyphicon glyphicon-home"></i>
                          <p>Home</p>
                        </a>
                      </div>
                  </div>
              </div>
                 
        </div>
        </div>
      <div className="col-sm-2"></div>
    </div>
        )
    }
})