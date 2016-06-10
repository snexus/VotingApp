var React = require("react");
var router = require("react-router")
var Link =router.Link
module.exports = React.createClass({
    render:function(){
        return(
<div className = "container body1">
           <div className="col-sm-12">
             <div className="col-sm-5 vertical-center">
                   <img src="http://compasscreative.ca/assets/content/images/marketing.png" className="img-responsive center-block  image" ></img>
             </div>
             <div className="col-sm-7 explanation ">
        
               <h5> As an authenticated user, you can:</h5>
               <ul>
                     <li>Create a poll with any number of possible items.</li>
                     <li>Delete a poll</li>
                    <li>Keep your polls and come back later to access them.</li>
                    <li>Share your polls with your friends.</li>
                    <li>See the aggregate results of your polls</li>
                    </ul>
                <hr></hr>
                 <h5> As an authenticated or  unauthenticated user, you can:</h5>
                 <ul>
                     <li> See and vote on everyone's polls.</li>
                     <li>See the results of polls in chart form</li>
                 </ul>
               <hr></hr>
               <Link to="signup">
                    <button className="button1">Sign Up</button>
               </Link>
             </div>
           </div>
    </div>
        )
    }
})