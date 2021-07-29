const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
// Create Schema
const jobsSchema = new Schema(
    {
	title: {
		type: String,
		required: true
	},
     typeofjob: {
      type: String,
      required: true
    },
     nameofrecruiter:{
       type: String,
     },
     
	idofrecruiter: {
		type: String,
		required: true
	    },
     maxappli: {
     	type: Number,
          default: 0
     },
     maxposi: {
       type: Number,
       default: 0
     },
     datepost: {
          type: Date,
          default: Date.now,
     },
     skill: [{
          id: "",
          what: "",
     }],
     rating: {
        type: Number
     },
     salary: {
      type: Number
     },
     deadlineday: {
        type: String,
     },
     deadlinetime: {
        type: String
     },
     duration: {
      type: Number
     },
     noofappli: {
      type: Number,
      default: 0
     },
     noofposi: {
      type: Number,
      default: 0,
     },
     applicants: [],
	
   },

   {
	collection: "jobs"
   }
);
jobsSchema.plugin(mongoose_fuzzy_searching, { fields: ["title"] });
module.exports = mongoose.model("Jobs", jobsSchema);
