module.exports = {
   login: function (email, pass, cb) {
    delete localStorage.token;
    cb = arguments[arguments.length - 1];
    authOnServer(email, pass, function(res){
        console.log("pretendRequest res = ",res)
      if (res.authenticated) {
        localStorage.token = res.token
        if (cb) cb(true)
      } else {
        if (cb) cb(false)
      }
    });
  },


  getToken: function() {
    return localStorage.token
  },

  logout: function(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(undefined)
  },

  loggedIn: function() {
      console.log("localStorage token = ", localStorage)
    
    return !!localStorage.token
    
  }


}

function pretendRequest(email, pass, cb) {
  
// debugging purposes
  setTimeout(function() {
      
    if (email === 'joe@example.com' && pass === 'password1') {
      cb({
        authenticated: true,
        token: Math.random().toString(36).substring(7)
      })
    } else {
      cb({ authenticated: false })
    }
  }, 0)}
  
  
  function authOnServer(login, pass, cb)
  {
    var xhr = new XMLHttpRequest();
    var user = 'login=' + encodeURIComponent(login) + '&password=' + encodeURIComponent(pass);
      xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); 
    xhr.responseType = 'json';
    xhr.onload = function() {
      console.log("this xhr =",this);
     if (this.status == 200) {
         cb({
        authenticated: true,
        token: this.response.token
     //   token: Math.random().toString(36).substring(7)
      });
      } else {
        
    cb({ authenticated: false });
      }
      
   };
  xhr.send(user);
    
  }