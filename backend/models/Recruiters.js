const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const recruitersSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	
     contact:{
     	type: Number
     },
     bio:{
       type: String,
       maxlength: 250
     },
     password:{
          type: String

     },
     types:{
          type: String
     }
	
},

{
     collection: "recruiters"
}


);

module.exports = mongoose.model("Recruiters", recruitersSchema);
