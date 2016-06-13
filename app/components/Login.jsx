var React = require("react");
var router = require("react-router")
var Link =router.Link
var withRouter = router.withRouter;
var auth = require("../auth/clientAuth.js")
var AuthStore =require("../stores/AuthStore");
var AuthActions = require("../actions/AuthActions");

module.exports = withRouter(
  React.createClass({

    getInitialState: function() {
      return {
        error: false,
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
      console.log("Login - on change received")
      this.setState({error:AuthStore.getLoginError()});
      console.log("error = ", AuthStore.getLoginError())
    },
    
    
    handleSubmit: function(event) {
      event.preventDefault()

      var email = this.refs.email.value
      var pass = this.refs.pass.value
    console.log("auth = ",auth)
      
      auth.login(email, pass, function(loggedIn){
           // console.log("this after auth = ",this)
        if (!loggedIn)
        {
          return AuthActions.loginFailed("Invalid username or password data");
        }
        
        //  return this.setState({ error: true })
         //this.setState({user:email,token:auth.getToken()});
        //console.log("Seems to login succesfully");
        AuthActions.loginSuccesfull(email)
        var location = this.props
        console.log("location = ",location)
        if (location.state && location.state.nextPathname) {
          this.props.router.replace(location.state.nextPathname)
        } else {
          this.props.router.replace('dashboard')
        }
      }.bind(this))
    },
    


    render: function() {
      console.log("inside log, location = ",this.state)
      return (
        // <form onSubmit={this.handleSubmit}>
        //   <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
        //   <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
        //   <button type="submit">login</button>
        
        //   {this.state.error && (
        //     <p>Bad login information</p>
        //   )}
        // </form>
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-6 login">
                <div className="login-page">

                  <div className="form">
                            {this.state.error && (
                                <p className="error-message">Bad login information</p>
                              )}
                              {this.props.message && (
                                <p className="error-message">{this.props.message}</p>
                              )}
                    <form className="login-form" onSubmit={this.handleSubmit}>
                      <input ref="email" type="text"  placeholder="username" />
                      <input ref="pass" type="password"  placeholder="password" />
                      <button type="submit">login</button>
                      <p className="message">Not registered? <Link to="signup">Create an account</Link></p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-sm-3"></div>
            </div>
      )
    }
  })
)