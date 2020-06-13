var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users")
var cookieParser = require('cookie-parser');


router.use(cookieParser());


router.get('/', function (req, res, next) {

  if(req.cookies.your_auth)
    res.redirect("/todo");
  else
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
          res.redirect("/login")
        } else {
          user.generateToken(function (err, user) {
            if (err)
              return res.json({
                error: err
              });
            else {
              var today = new Date();
              user.logged = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + " " + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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