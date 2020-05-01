var db = require("./connection.js");
var userSche = require("./userSchema.js");
var bcrypt = require("bcryptjs");
var saltRounds = 10;

var mail = require("../javascript/emailDetails.js");

module.exports = {
	readUser: function (name, pass, callback) {
		var q = userSche.findOne({ userName: name });

		q.exec(function (err, u) {
			if (err) {
				callback(err, null);
			} else if (u == null) {
				err = "Wrong username or password!";
				callback(err, null);
			} else {
				bcrypt.compare(pass, u.passWord, (err, res) => {
					if (res) {
						callback(null, u);
					} else {
						err = "Wrong username or password!";
						callback(err, null);
					}
				});
			}
		});
	}, //find a user
	createUser: function (name, e, pw, callback) {
		bcrypt.hash(pw, saltRounds, (err, hash) => {
			if (err) {
				console.log("oh o " + err);
			} else {
				var newUser = new userSche({
					userName: name,
					email: e,
					passWord: hash,
				});
				newUser.save((err) => {
					if (err) {
						console.log("error inside crud: " + err.keyValue);
						callback(err.keyValue, null);
					} else {
						// mail.eLoginDeetsFirstTime(name, e);
						callback(null, null);
					}
				});
			}
		});
	}, //create new user (name = userName, e = email, pw= passWord)
	updateUser: function (name, pass) {
		userSche.findOneAndUpdate(
			{ userName: name },
			{ passWord: pass },
			{ new: true },
			(err, doc) => {
				if (err) {
					console.log("oh o something went wrong");
				}
				console.log(doc);
			}
		);
	}, //update user data, such as username(true) or pass(false)
	delUser: function (name) {
		userSche.findOneAndDelete({ userName: name }, (err, doc) => {
			if (err) console.log("oh o something went wrong!");
			console.log("User deleted! Bye bye!");
		});
	}, //delete a user.

	getMoney: async (name) => {
		var querry = userSche.findOne({ userName: name }).select("money");
		return await querry.exec();
	},
	updateScore: (nameToFind, whatScoreToUpdate) => {
		console.log(nameToFind + " " + whatScoreToUpdate);
		var score;
		var update = {};
		var filter = { userName: nameToFind };
		var q = userSche.findOne(filter);
		q.exec(function (err, user) {
			if (err) return next(err);
			if (whatScoreToUpdate == "wins") {
				score = user.wins;
				console.log("wins " + score);
				update = { wins: score + 1 };
				console.log(update);
			}
			if (whatScoreToUpdate == "losses") {
				score = user.losses;
				console.log("losses " + score);
				update = { losses: score + 1 };
			}
		});

		userSche.findOneAndUpdate(
			filter,
			{ $set: update },
			{ new: true },
			(callback) => {
				
			}
		);
	},
	findAllUsers: () => {
		var userMap = [];

		userSche.find({}, (err, users) => {
			users.forEach((user) => {
				var i = {
					name: user.userName,
					w: user.wins,
					l: user.losses,
					m: user.money,
				};
				console.log(i);
				userMap.push(i);
			});

			return userMap;
		});
	},

	setMoney: (name, cash) => {
		userSche.findOneAndUpdate(
			{ userName: name },
			{ money: cash },
			{ new: true }
		);
	},

	pingTestUser: function () {
		var newUser = new userSche({
			userName: "Dav",
			email: "gorskidawid98@gmail.com",
			passWord: "yes",
		});
		// print the users data to console
		console.log("id " + newUser.id);
		console.log("name " + newUser.userName);
		console.log("email " + newUser.email);
		console.log("password " + newUser.passWord);
		console.log("money " + newUser.money);
		console.log("exp " + newUser.exp);
		console.log("date created " + newUser.dateCreated);
	},
};
