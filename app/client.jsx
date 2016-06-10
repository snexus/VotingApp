var React = require("react");
var ReactDOM = require("react-dom");
var router = require("react-router")
var App = require("./components/App.jsx");
var Main = require("./components/Main.jsx")
var Signup = require("./components/Signup.jsx")
var UserPoll = require("./components/UserPoll.jsx")
var Dashboard = require("./components/Dashboard.jsx")
var PollVotePage = require("./components/PollVotePage.jsx")
var Login = require("./components/Login.jsx")
var PollListView = require("./components/PollListView.jsx")
var Router = router.Router
var Route = router.Route
var IndexRoute = router.IndexRoute
var hashHistory=router.hashHistory
var auth = require("./auth/clientAuth.js")


auth.logout()

  function requireAuth(nextState, replace) {
      if (!auth.loggedIn()) {
        replace({
          pathname: '/login',
          state: { nextPathname: nextState.location.pathname }
        })
      }
    }

          
function render(){
    
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={App}>
               <IndexRoute component={Main}></IndexRoute>
               <Route path="signup" name="signup" component={Signup}></Route>
               <Route path="login" name="login" component={Login}></Route>
               <Route path="userpoll" name="userpoll" component={UserPoll}></Route>
               <Route path="pollvotepage/:pollid" name="pollvotepage" component={PollVotePage}></Route>
               <Route path="dashboard" name="dashboard" component={Dashboard} onEnter={requireAuth}></Route>
               <Route path="polls/:user" name="polls" component={PollListView}></Route>
               
              
            </Route>
        </Router>
        
        ), document.getElementById("app"));    
}
render();