var dispatcher = require("../dispatcher");

module.exports = {
    loginSuccesfull:function(user){
        dispatcher.dispatch({
           type:"LOGIN_SUCCESS",
           user: user,
        });
    },
    loginFailed:function(msg){
        dispatcher.dispatch({
           type:"LOGIN_FAILED",
           message: msg,
        });
    },
    logout:function(){
        dispatcher.dispatch({
           type:"LOGOUT",
        });
    }
}

