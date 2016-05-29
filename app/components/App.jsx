var React = require("react");
var Nav = require("../components/Nav.jsx");
var Header = require("../components/Header.jsx");
var Footer = require("../components/Footer.jsx");
// var Main = require("../components/Main.jsx");
module.exports = React.createClass({
  
  
  
  
    render:function(){
        var location = this.props;
        return(
                <div>
                <Nav location={location}/>
                <Header />
                <div className="container body1">
                  <div class="row">
                    <div class="col-sm-12">
                      {this.props.children}
                    </div>
                  </div>
                 </div>
                <Footer />
                </div>
        )
    }
})