var React = require("react");
var router = require("react-router")
var Link =router.Link
var AuthStore =require("../stores/AuthStore");
var auth = require("../auth/clientAuth.js")
var AuthActions = require("../actions/AuthActions");

module.exports = React.createClass({
     getInitialState: function() {
      return {
        userLoggedIn: false
      }
    },
    componentWillMount: function()
    {
      AuthStore.addChangeListener(this.onChange)
    },
    
     componentWillUnmount: function() {
      AuthStore.removeChangeListener(this.onChange)  
  },

    
    onChange: function()
    {
      console.log("nav - on change received")
      this.setState({userLoggedIn:AuthStore.getCurrentUser()});

    },
    
    handleLogout: function()
    {
        auth.logout(function(){
            return AuthActions.logout();
        })
       
    },
    
    
    render:function(){
    var location = this.props.location.location;
    // console.log("location = ",location)
    var homeClass = location.pathname === "/" ? "active" : "";
    var pollsClass = location.pathname.match(/^\/polls/) ? "active" : "";
    var dashboardClass = location.pathname.match(/^\/dashboard/) ? "active" : "";
    var loginClass = location.pathname.match(/^\/login/) ? "active" : "";
    var logoutClass = location.pathname.match(/^\/logout/) ? "active" : "";
    var signupClass = location.pathname.match(/^\/signup/) ? "active" : "";
    var loginText = "Login";
    
    
    if (this.state.userLoggedIn)
    {
        loginText = "Logout";
    }
    console.log("signupClas = ", signupClass)
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
                                <li className={pollsClass}> <Link to="polls/all">Polls</Link></li>
                                <li className={dashboardClass}><Link to="dashboard">Dashboard</Link></li>
                            </ul>
                                {!this.state.userLoggedIn && (
                             <ul className="nav navbar-nav navbar-right">
                                <li  className={loginClass}><Link to="login">Login</Link></li>
                              <li className={signupClass}><Link to="signup">Sign Up</Link></li>
                            </ul>
                              )}
   
                                 {this.state.userLoggedIn && (
                                    <div>
                                        <ul className="nav navbar-nav navbar-right">
                                            <li  className={logoutClass} onClick={this.handleLogout}><a href="#">Logout</a></li>
                                         
                                        </ul>
                                         <div className="collapse navbar-collapse">
                                             <p className="navbar-text pull-right">Welcome, {this.state.userLoggedIn}</p>
                                        </div>
                                    </div>
                              )}
                              
                        </div>
                    </div>
                </nav>
        )
    }
})