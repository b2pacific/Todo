var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users")
const Tasks = require("../models/tasks")
const config = require("../config/key");

const url = config.mongoURI;
const connect = mongoose.connect(url, {useNewUrlParser: true});

connect.then(function (db) {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
});

router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', function (req, res, next) {

  const tasks = new Tasks.Tasks({
    item: "Add Your tasks."
  });

  var user = new Users({
    email: req.body.email,
    password: req.body.pass1,
    task: [tasks]
  })

  user.save(function (err, user) {
    if (err)
      res.json({
        error: err
      })
    else {
      res.redirect("/login");
    }
  })
});

module.exports = router;