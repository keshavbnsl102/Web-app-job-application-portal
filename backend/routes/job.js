const bcrypt = require("bcrypt");
const router = require("express").Router();
const { check, validationResult } = require("express-validator");
require("dotenv").config();
// Load User model
const jwt = require("jsonwebtoken");
// Load User model
const Recruiters = require("../models/Recruiters");
const Jobs=require("../models/job");
const Applis=require("../models/Applis");
const Myappli=require("../models/myappli");


router.post(
  "/add",
  [check("salary").isNumeric(), 
    check("maxappli").isNumeric(),check("maxposi").isNumeric()
  ],
  (req, res) => {
    // console.log("here");
    // console.log(req.body);
    let job = new Jobs({
      title: req.body.title,
      salary: req.body.salary,
      typeofjob: req.body.typeofjob,
      idofrecruiter: req.body.idofrecruiter,
      maxappli: req.body.maxappli,
      maxposi: req.body.maxposi, 
      deadlineday: req.body.deadlineday,
      deadlinetime: req.body.deadlinetime,
      skill: req.body.skill,
      duration: req.body.duration,
      nameofrecruiter: req.body.nameofrecruiter,


    });

    console.log("here", job);
    // console.log("heyya");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
   console.log("musthave");
    job
      .save()
      .then(job => {
        res.status(200).json({ Job: "Job added successfully" });
      })
      .catch(err => {
        console.log("yep", err);
        res.status(400).send(err);
      });
  }
);




router.post("/search", (req, res) => {
    var search=req.body.search;
   Jobs.fuzzySearch(search, function(err, resp) {
			res.send(resp);
		});

  // Jobs.find({
  //   title: req.body.search,
  // })
  //   .then(jobs => {
  //     toRet = [];
  //     let done = 0;
  //     if (jobs.length === 0) {
  //       return res.status(200).send(toRet);
  //     } else {
  //       for (var i = 0; i <jobs.length; i++) {
  //         let job = jobs[i];
  //         let jobid = job.idofrecruiter;
  //         Recruiters.find(
  //           {
  //             _id: jobid
  //           },
  //           (err, user) => {
  //             if (err) {
  //               return res.status(500).json(err);
  //             }
  //             let temp = {};
  //             temp._id = job._id;
  //             temp.title = job.title;
  //             temp.typeofjob = job.typeofjob;
  //             temp.idofrecruiter = user[0]._id;
  //             temp.maxposi = job.maxposi;
  //             temp.maxappli = job.maxappli;
  //             temp.datepost = job.datepost;
  //             temp.skill = job.skill;
  //             temp.rating = job.rating;
  //             temp.salary = job.salary;
  //             temp.deadlinetime=job.deadlinetime;
  //             temp.deadlineday=job.deadlineday;
  //             //temp.vendorRating = user[0].rating / user[0].rateCount;
  //             toRet.push(temp);
  //             done++;
  //             // console.log(i + 1, temp);
  //             // console.log(done, toRet);

  //             if (done === jobs.length) {
  //               return res.status(200).send(toRet);
  //             }
  //           }
  //         );
  //       }

  //     }

      
  //   })
  //   .catch(err => {
  //     res.status(200).send([]);
  //     console.log(err);
  //   });
});



router.post("/idse", function(req, res) {
    let ids=req.body.ids;
    console.log("welcome");
    Jobs.find({
    idofrecruiter: ids,
  })
    .then(product => {
        console.log(product);
      res.status(200).json(product);
    })
    .catch(err => {
      res.status(200).send(err);
      console.log(err);
    });});



router.post("/edit", function(req, res) {
    let id = req.body.ids;
    let maxposis=req.body.maxposi;
    let maxapplis=req.body.maxappli;
     
  Jobs.findByIdAndUpdate(
    { _id: id },
    { maxappli: maxapplis, maxposi: maxposis },
    (err, product) => {
      if (err) {
        res.status(400).json(err);
      }
      console.log("dispatching");
      return res.status(200).json({ success: true });
    }
  );
});



router.post("/addappli", function(req, res) {
    let id = req.body.jobid;
     let noofapplis=req.body.noofappli+1;
     let applicant=req.body.applicants;
     let applicantid=req.body.applicantids;
     applicant.push(applicantid);
     console.log(applicant);
  Jobs.findByIdAndUpdate(
    { _id: id },
    { noofappli: noofapplis, applicants: applicant },
    (err, product) => {
      if (err) {
        res.status(400).json(err);
      }
      console.log("doodle");
      return res.status(200).json({ success: true });
    }
  );
});

module.exports= router;