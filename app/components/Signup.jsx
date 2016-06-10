var React = require("react");
var router = require("react-router")
var Link =router.Link
var withRouter = router.withRouter;
var auth = require("../auth/clientAuth.js")


module.exports = withRouter(
  React.createClass({

    getInitialState: function() {
      return {
        error: false,
        message:""
      }
    },
    
  
    
    handleSubmit: function(event) {
      event.preventDefault()

      var email = this.refs.username.value
      var pass = this.refs.pass.value
      var pass2 = this.refs.pass2.value
      console.log("inside submit, login, pass, pass2 = ", email, pass, pass2)
      if (pass!=pass2) return this.setState({ error: true, message:"Passwords don't match" })

      
      auth.signupOnServer(email, pass, function(error, message){
        console.log("inside callback, error, message = ", error, message)
            return this.setState({ error: error, message: message })
      
      }.bind(this))
    },
    


    render: function() {
    
      if (!this.state.error && this.state.message!="")
      {
        return (
          <p>{this.state.message}</p> )
      }
      else {
      return (
        // <form onSubmit={this.handleSubmit}>
        //   <label><input ref="username" placeholder="Username" defaultValue="joe@example.com" /></label><br />
        //   <label><input ref="pass" placeholder="Password" /></label><br />
        //   <label><input ref="pass2" placeholder="Confirm password" /></label><br />
        //   <button type="submit">Signup</button>
        //   {this.state.error && (
        //     <p>{this.state.message}</p>
        //   )}
          
        // </form>
                    <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-6 login">
                <div className="login-page">

                  <div className="form">
                            {this.state.error && (
                                <p className="error-message">{this.state.message}</p>
                              )}
                    <form className="login-form" onSubmit={this.handleSubmit}>
                      <input ref="username" type="text" placeholder="username" />
                      <input ref="pass" type="password" placeholder="password" />
                       <input ref="pass2" type="password" placeholder="confirm password" />
                      <button type="submit">Signup</button>
                      <p className="message">Already registered? <Link to="login">Sign In</Link></p>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-sm-3"></div>
            </div>
      )
    }
  }}
  )
)