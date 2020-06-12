var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users");
var auth = require("../authenticate");

router.post('/', auth, function (req, res, next) {
    
    const taskID = req.body.checkbox;

    Users.findOneAndUpdate({"_id": req.user._id}, {$pull: {task: {_id: taskID}}}, function(err, foundList){
        if(!err)
        {
          res.redirect("/todo");
        }
      })

});

module.exports = router;