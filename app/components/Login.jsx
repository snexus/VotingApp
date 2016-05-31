var React = require("react");
var router = require("react-router")
var withRouter = router.withRouter;
var auth = require("../auth/clientAuth.js")


module.exports = withRouter(
  React.createClass({

    getInitialState: function() {
      return {
        error: false
      }
    },

    handleSubmit: function(event) {
      event.preventDefault()

      var email = this.refs.email.value
      var pass = this.refs.pass.value
    console.log("auth = ",auth)
      
      auth.login(email, pass, function(loggedIn){
           // console.log("this after auth = ",this)
        if (!loggedIn)
        
          return this.setState({ error: true })
         this.setState({user:email,token:auth.getToken()});
        //console.log("Seems to login succesfully");
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
                    <form className="login-form" onSubmit={this.handleSubmit}>
                      <input ref="email" type="text" placeholder="username" />
                      <input ref="pass" type="password" placeholder="password" />
                      <button type="submit">login</button>
                      <p className="message">Not registered? <a href="#">Create an account</a></p>
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