var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");

const { check, validationResult } = require("express-validator");
require("dotenv").config();
// Load User model
const jwt = require("jsonwebtoken");
let Applis = require("../models/Applis");

// GET request 
// Getting all the users
router.post("/idse", function(req, res) {
    let ids=req.body.ids;
    console.log("rrrrrr");
    console.log(ids);
    Applis.find({
    _id: ids,
    })
    .then(product => {
        console.log(product[0]);
      res.status(200).json(product[0]);
    })
    .catch(err => {
        console.log(err);
      res.status(200).send(err);
      
    });});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register", 
    [
    check("name",'Invalid name').isAlpha()
    ],(req, res) => {
      
      let hashing = bcrypt.hashSync(req.body.password, 10);
    const newUser = new Applis({
        password: hashing,
        email: req.body.email,
        name: req.body.name,
        //cats: req.body.cats,
       education: req.body.education,
        skill: req.body.skill,
        types: req.body.types,
    });
      const errors = validationResult(req);
      //console.log(req.body.cats);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
       console.log(req.body.education);
      console.log("yoyo");
    newUser
        .save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

// POST request 
// Login
router.post("/login", (req, res) => {
	const email = req.body.email;
    let password = req.body.password;
  let types = req.body.types;
	// Find user by email
	Applis.findOne({ email: email },(err,user) => {
		// Check if user email exists
        if (err) {
      return res.json(err);
       }

		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }
        if (
        user &&
      bcrypt.compareSync(password, user.password) &&
      user.types === types
    ) {     
          const payload = {
        id: user.id,
        name: user.name
      };

      console.log(process.env.SECRET_OR_KEY);
      console.log(payload);
      token = jwt.sign(payload, process.env.SECRET_OR_KEY);
      console.log(token);
      res.send(token);
        }
      else{
             
            res.json({ data: "wrong" });
        }
	});
});



router.post("/edit", function(req, res) {
    let id = req.body.ids;
    let names=req.body.name;
    let emails=req.body.email;
    let skills=req.body.skill;
    let educations=req.body.education;
     
  Applis.findByIdAndUpdate(
    { _id: id },
    { name: names, email: emails, skill: skills,education: educations },
    (err, product) => {
      if (err) {
        res.status(400).json(err);
      }
      console.log("dispatching");
      return res.status(200).json({ success: true });
    }
  );
});

module.exports = router;

