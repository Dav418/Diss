var mongoose = require('mongoose');
var url = 'mongodb+srv://admin:admin1234@esspolly-3dcjm.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection to mongoDB established")
});

module.exports = db;