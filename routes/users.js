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

  User.createUser(un, e, pw);

  //redirect
  res.sendFile("userCreated.html", {root:rootHTML})
}); // redirect to html file that will send user their data vie email

router.get('/signup', function(req, res, next) {
  res.sendFile('signup.html', {root:  rootHTML});
});

router.post('/log_in', function(req, res,next ) {
  var un = req.body.un;
  var pw = req.body.pw;

  var c =  User.getMoney(un);
 
  c.then(info =>{
    console.log("below c")
    console.log(info.money)
    //User.setMoney(un,info.money + 100)
  })
  User.readUser(un, pw, function(err, u){
    if(err) console.log("User dont exist!");
    if(!u) console.log("User dont exist! empty u object");
    else{ 
      var sess = req.session;
      var date = new Date(u.dateCreated);

      sess.userObj = {
        userName : u.userName,
        cash : u.money,
        bDay : date.toDateString(),
        exp : u.exp
      }

      req.session.save();
      res.redirect("/users")
    }
  })
});// redirect to dashboard after user has succesfully logged on

router.get('/login', function(req, res, next) {
  res.sendFile('login.html',  { root: rootHTML });
  console.log(rootHTML);
});



module.exports = router;
