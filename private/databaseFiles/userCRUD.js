var db = require("./connection.js");
var userSche = require("./userSchema.js");
var bcrypt = require("bcryptjs");
var saltRounds = 10;

var mail = require("../javascript/emailDetails.js");


module.exports = {

    readUser : function (name, pass, callback) {
		var q = userSche.findOne({userName: name})
			
		q.exec(function(err, u){
			if(err){callback(err,null)}
			else if(u == null){
				err = "Wrong username or password!"
				callback(err,null);
			}
			else{
				bcrypt.compare(pass, u.passWord, (err,res)=> {
					if(res){
						callback(null, u);
					}
					else{
						err = "Wrong username or password!"
						callback(err, null)}
					})
			}
		});

	}, //find a user
	createUser: function(name, e, pw, callback) {
		bcrypt.hash(pw, saltRounds, (err,hash) => {
			if (err) {
				console.log("oh o " + err);
			}
			else{
				var newUser = new userSche({userName : name, email : e, passWord : hash});
				newUser.save( err => {
					if (err) {
						callback(err.keyValue)
					}
					else {
						mail.eLoginDeetsFirstTime(name,e);
					};
				});
			};
		})	
	}, //create new user (name = userName, e = email, pw= passWord)
	updateUser: function (name, pass) {
		userSche.findOneAndUpdate({userName: name}, {passWord: pass} , {new:true}, (err,doc) => {
			if(err){console.log("oh o something went wrong");}
			console.log(doc);	
		})
	}, //update user data, such as username(true) or pass(false)
	delUser: function (name) {
		userSche.findOneAndDelete({userName:name}, (err, doc) => {
			if (err) console.log("oh o something went wrong!");
			console.log("User deleted! Bye bye!");
		})
	}, //delete a user. not 100% sure i want this

	getMoney : async (name)=>{
		var querry = userSche.findOne({userName: name}).select("money")
		return await querry.exec();
	},

	setMoney: (name,cash)=>{
		console.log("the name is " + name)
		userSche.findOneAndUpdate({userName: name} , {money:cash} , {new:true} , function(err, doc){
			if(err){console.log("money not updated ")}else{
				console.log(doc)
				//console.log(doc.money)
			}
		});
		

	},

	

	pingTestUser : function () {
		var newUser = new userSche({userName : "Dav",
		email : "gorskidawid98@gmail.com",
		passWord : "yes"});
		// print the users data to console
		console.log("id " +newUser.id);
		console.log("name "+newUser.userName);
		console.log("email "+newUser.email);
		console.log("password "+newUser.passWord);
		console.log("money "+newUser.money);
		console.log("exp "+newUser.exp);
		console.log("date created "+newUser.dateCreated); }

}
