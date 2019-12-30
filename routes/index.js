var express = require('express');
var router = express.Router();

var routeHTML = './public/html';

var swig  = require('swig');

/* GET home page. */
router.get('/', function(req, res) {
  
  console.log("inside index.js ");
  var sess= req.session;

  console.log(sess);
 
  if(sess.userObj){
    var tmpl = swig.compileFile(routeHTML+"/index.html"),
    renderedHTML = tmpl({
      noLogin : false,
      userName : sess.userObj.userName,
    });
    
  }
  else{
    
    var tmpl = swig.compileFile(routeHTML+"/index.html"),
    renderedHTML = tmpl({
      userName : "Errrrrrrr",
      noLogin : true,
    });
    
  }

  res.end(renderedHTML);
});


module.exports = router;
