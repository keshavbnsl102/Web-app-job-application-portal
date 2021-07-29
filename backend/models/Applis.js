const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const applisSchema = new Schema(
    {
	name: {
		type: String,
		required: true
	},
     password: {
      type: String,
      required: true
    },
	email: {
		type: String,
		required: true,
          unique: true
	},
     education: [{
           Institute: "",
           Startdate: "",
           Enddate: "",
     }],
     skill: [{
          id: "",
          what: "",
     }],
     noofratings: {
     	type: Number,
          default: 0
     },
     rating: {
       type: Number,
       default: 0
     },
     types: {
          type: String
     },
     cats: [{
          name: "",
          age: "",
     }],
     noofappli: {
          type: Number,
          default: 0
     },
     flag: {
          type: Boolean,
          default: false
     },
	
   },

   {
	collection: "applicants"
   }
);

module.exports = mongoose.model("Applis", applisSchema);
