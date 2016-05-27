var React = require("react");
var ReactDOM = require("react-dom");
var router = require("react-router")
var Layout = require("./layout/Layout.jsx");
var Main = require("./components/Main.jsx")
var Signup = require("./components/Signup.jsx")
var Login = require("./components/Login.jsx")
var Router = router.Router
var Route = router.Route
var IndexRoute = router.IndexRoute
var hashHistory=router.hashHistory
                
function render(){
    ReactDOM.render((
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
               <IndexRoute component={Main}></IndexRoute>
               <Route path="signup" name="signup" component={Signup}></Route>
               <Route path="login" name="signup" component={Login}></Route>
            </Route>
        </Router>
        
        ), document.getElementById("app"));    
}
render();