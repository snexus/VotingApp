var React = require("react");
var router = require("react-router")
var Link =router.Link
module.exports = React.createClass({
    render:function(){
    var location = this.props.location.location;
    // console.log("location = ",location)
    var homeClass = location.pathname === "/" ? "active" : "";
    var pollsClass = location.pathname.match(/^\/polls/) ? "active" : "";
    var dashboardClass = location.pathname.match(/^\/dashboard/) ? "active" : "";
    var loginClass = location.pathname.match(/^\/login/) ? "active" : "";
    var signupClass = location.pathname.match(/^\/signup/) ? "active" : "";

        return(
                <nav role="navigation" className="navbar navbar-default navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a href="#" className="navbar-brand">SiVote</a>
                        </div>
                       
                        <div id="navbarCollapse" className="collapse navbar-collapse">
                            <ul className="nav navbar-nav">
                                <li className={homeClass}><a href="#">Home</a></li>
                                <li className={pollsClass}><a href="#">Polls</a></li>
                                <li className={dashboardClass}><Link to="dashboard">Dashboard</Link></li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li  className={loginClass}><Link to="login">Login</Link></li>
                              <li className={signupClass}><Link to="signup">Sign Up</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
        )
    }
})