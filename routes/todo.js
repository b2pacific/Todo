var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users")
const Tasks = require("../models/tasks")
var auth = require("../authenticate");

router.get('/', auth, function (req, res, next) {
    const email=req.user.email;
    res.render('todo', {tasks: req.user.task, email: email});
});

router.post('/', auth, function (req, res, next) {
    const task = req.body.newtask;
    var tasks = req.user.task;
    const item = new Tasks.Tasks({
        item: task
    });
    tasks.push(item);
    var user = req.user;

    Users.findOneAndUpdate({"_id": user._id}, {"task": tasks}, function(err, tasks){
        if(err)
            next(err)
        else
        {
            return res.redirect("/todo");
        }
    })
});

module.exports = router;