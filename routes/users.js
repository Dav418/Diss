var express = require('express');
var router = express.Router();
var User = require("../private/databaseFiles/userCRUD.js");

var swig  = require('swig');
var path = require('path');

var rootHTML = path.join(__dirname, '../public/html/users')


/* GET users listing. */
router.get('/', function(req, res, next) {
  var sess = req.session;
  if(sess.userObj){
    var tmpl = swig.compileFile(rootHTML+"/dashboard.html"),
      renderedHTML = tmpl({
        userName : sess.userObj.userName,
        cash : sess.userObj.cash,
        bdate : sess.userObj.bDay,
        exp : sess.userObj.exp
      });

      req.session.save();
      res.end(renderedHTML);
  }else{
    res.sendFile('403.html', {root: path.join(__dirname, '../public/html/error')});
  }
});


router.post('/sign_up', function(req, res, next) {
  var un = req.body.name;
  var e = req.body.email;
  var pw = req.body.password;

  User.createUser(un, e, pw, (err)=>{
      var tmpl = swig.compileFile(rootHTML+"/signup.html")
      if(err){
      renderedHTML = tmpl({
        error : true,
        errMsg : err,
        userNam: un,
        em: e
      });
      res.end(renderedHTML);
    };
    
    res.sendFile("userCreated.html", {root:rootHTML})
  })
})

router.get('/signup', function(req, res, next) {
  var tmpl = swig.compileFile(rootHTML+"/signup.html")
      renderedHTML = tmpl({
        error : false,
        errMsg : "",
        userNam: "",
        em: ""
      });
      res.end(renderedHTML);
    
    res.sendFile("userCreated.html", {root:rootHTML})
});

router.post('/log_in', function(req, res,next ) {
  var un = req.body.un;
  var pw = req.body.pw;

  User.readUser(un, pw, function(err, u){
    if(err || !u) {console.log("inside err"); 
    var tmpl = swig.compileFile(rootHTML+"/login.html"),
    renderedHTML = tmpl({
      error : true,
      errMsg : err,
      userNam: un
    });
    //do tha same but for success
    
    res.end(renderedHTML);
    }else{ 
      var sess = req.session;
      var date = new Date(u.dateCreated);

      sess.userObj = {
        userName : u.userName,
        cash : u.money,
        bDay : date.toDateString(),
        exp : u.exp
      }
      sess.youMayEnter = false;

      req.session.save();
      res.redirect("/users")
    }
  })
});// redirect to dashboard after user has succesfully logged on

router.get('/login', function(req, res, next) { 
  var tmpl = swig.compileFile(rootHTML+"/login.html"),
  renderedHTML = tmpl({
    error : false,
    errMsg : ":)"
  });
  
  res.end(renderedHTML);
});

module.exports = router;
