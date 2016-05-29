var React = require("react");
var ReactDOM = require("react-dom");
var router = require("react-router")
var App = require("./components/App.jsx");
var Main = require("./components/Main.jsx")
var Signup = require("./components/Signup.jsx")
var Dashboard = require("./components/Dashboard.jsx")
var Login = require("./components/Login.jsx")
var Router = router.Router
var Route = router.Route
var IndexRoute = router.IndexRoute
var hashHistory=router.hashHistory
var auth = require("./auth/clientAuth.js")




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
               <Route path="dashboard" name="dashboard" component={Dashboard} onEnter={requireAuth}></Route>
            </Route>
        </Router>
        
        ), document.getElementById("app"));    
}
render();