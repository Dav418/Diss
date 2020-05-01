var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userSchema = new Schema({

  userName : {
    type: String,
    required: true,
    unique: true
  },

  email : {
    type: String,
    required: true,
    unique: true
  },

  passWord : String,

  money : {
    type : Number,
    default : 0
  },

  exp : {
    type : Number,
    default : 0
  },

  dateCreated : {
	type : Date,
	default : Date.now
  },

  wins :{
    type: Number,
    default:0
  },

  losses :{
    type: Number,
    default:0
  },

});

module.exports = mongoose.model('User', userSchema);
