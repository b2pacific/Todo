var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users")
var cookieParser = require('cookie-parser');


router.use(cookieParser());


router.get('/', function (req, res, next) {

  // if(req.token === "")
  //   res.render("login");
  // else
  //   res.redirect("/todo");
  res.render("login");
      
});

router.post('/', function (req, res, next) {

  Users.findOne({
    email: req.body.email
  }, function (err, user) {
    if (!user) {
      res.redirect("/");
    } else {
      user.comparePassword(req.body.pass1, function (err, isMatch) {
        if (!isMatch) {
          res.redirect("login")
        } else {
          user.generateToken(function (err, user) {
            if (err)
              return res.statusCode(400);
            else {
              return res.cookie("your_auth", user.token)
                .redirect("/todo");
            }
          })
        }
      })
    }
  })


});

module.exports = router;