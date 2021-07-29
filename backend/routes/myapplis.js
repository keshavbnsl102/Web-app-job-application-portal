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
  (req, res) => {
    // console.log("here");
    // console.log(req.body);
    let job = new Myappli({
      applicantid: req.body.applicantid,
      jobid: req.body.jobid,
      sop: req.body.sop,
      name: req.body.name,
      email: req.body.email,
      education: req.body.education,
      skill: req.body.skill,
      nameofrecruiter: req.body.nameofrecruiter,
      salary: req.body.salary,
      title: req.body.title,

    });

    console.log("here", job);
    // console.log("heyya");

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
   console.log("application added");
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




router.post("/idse", function(req, res) {
    let ids=req.body.ids;
    console.log("welcome");
    console.log(ids);
    Myappli.find({
    jobid: ids,
  })
    .then(product => {
        console.log(product);
      res.status(200).json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(200).send(err);
      
    });});

router.post("/appliidse", function(req, res) {
    let ids=req.body.ids;
    console.log("welcome");
    console.log(ids);
    Myappli.find({
    applicantid: ids,
  })
    .then(product => {
        console.log(product);
      res.status(200).json(product);
    })
    .catch(err => {
      console.log(err);
      res.status(200).send(err);
      
    });});



router.post("/delete", function(req, res) {
    let jobids=req.body.ids;
    let applicantids=req.body.idss;

    console.log("welcome");
    Myappli.deleteOne({
    applicantid: applicantids,
    jobid: jobids
  })
    .exec()
    .then(res => {
      res.send("deleted");
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
      
    });});



router.post("/short", function(req, res) {
    let jobids=req.body.ids;
    let applicantids=req.body.idss;

    console.log("welcome");
    Myappli.findOneAndUpdate({
    applicantid: applicantids,
    jobid: jobids
  },{status: "shortlisted"},(err,user) =>{
      if (err) {
        res.status(400).json(err);
      }
      console.log("shorty");
      return res.status(200).json({ success: true});
    
      
    }
  );

});



router.post("/accept", function(req, res) {
    let jobids=req.body.ids;
    let applicantids=req.body.idss;

    console.log("welcome");
    Myappli.deleteOne({
    applicantid: applicantids,
    jobid: jobids
  })
    .exec()
    .then(res => {
      res.send("deleted");
    })
    .catch(err => {
      console.log(err);
      res.status(400).send(err);
      
    });});


module.exports= router;