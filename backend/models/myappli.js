const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const myappliSchema = new Schema(
    {
	  applicantid: {
		type: String,
		required: true
	},
     jobid: {
      type: String,
      required: true
    },
     sop: {
      type: String,
      required: true
     },
     status: {
      type: String,
      default: "Applied for further processing"
     },
     name: {
      type: String,
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
     date: {
      type: Date,
      default: Date.now,
     },
     email: {
      type: String,
     },
     title: {
      type: String,
     },
     salary: {
      type: Number,
     },
     nameofrecruiter:{
      type: String,
     },
    

	
   },

   {
	collection: "Myapplis"
   }
);

module.exports = mongoose.model("Myappli", myappliSchema);
