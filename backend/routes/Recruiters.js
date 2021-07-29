var express = require("express");
var router = express.Router();

const bcrypt = require("bcrypt");

const { check, validationResult } = require("express-validator");
require("dotenv").config();
// Load User model
const jwt = require("jsonwebtoken");
// Load User model
const Recruiters = require("../models/Recruiters");

// GET request 
// Getting all the users
router.get("/", function(req, res) {
    User.find(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			res.json(users);
		}
	})
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register",[
    check("name",'enter only alphabets in name field').isAlpha()


    ],(req, res) => {
    let hashing = bcrypt.hashSync(req.body.password, 10);
    const newUser = new Recruiters({
        name: req.body.name,
        email: req.body.email,
        password: hashing,
        bio: req.body.bio,
        contact: req.body.contact,
        types: req.body.types
    });
      const errors = validationResult(req);
      
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    newUser.save()
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
  console.log(types);
    // Find user by email
    Recruiters.findOne({ email: email },(err,user) => {
        // Check if user email exists
        if (err) {
      return res.json(err);
       }

        if (!user) {
            return res.json({
                data: "wrong",
            });
        }
        console.log(user.types);
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
    let bios=req.body.bio;
    let contacts=req.body.contact;
     
  Recruiters.findByIdAndUpdate(
    { _id: id },
    { name: names, email: emails, bio: bios,contact: contacts },
    (err, product) => {
      if (err) {
        res.status(400).json(err);
      }
      return res.status(200).json({ success: true });
    }
  );
});


router.post("/idse", function(req, res) {
    let ids=req.body.ids;
    console.log("yehyehe");
    Recruiters.find({
    _id: ids,
  })
    .then(product => {
        console.log(product[0]);
      res.status(200).json(product[0]);
    })
    .catch(err => {
      res.status(200).send(err);
      console.log(err);
    });});

module.exports = router;

